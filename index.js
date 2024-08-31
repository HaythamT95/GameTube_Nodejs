import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import morgan from "morgan"
import routerGame from "./route/gameRoute.js"
import Game from "./model/game.js"
import { faker } from "@faker-js/faker"

dotenv.config()

const m = morgan
const app = express()

mongoose.connect(process.env.DATABASEURL).then(() => console.log("DB connected")).catch((err) => console.log("DB Failed to Connect", err))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(m("dev"))

app.use("/games", routerGame);

app.listen(process.env.PORT || 3000, () => console.log("server running on port 3000"))

const createRandomGames = async (numGames = 20) => {
    try {
        const predefinedCategories = [
            "Adventure", "Action", "Sports", "Simulation", "Platformer", "RPG", "First-person shooter",
            "Action-adventure", "Fighting", "Real-time strategy", "Racing", "Shooter", "Puzzle", "Casual",
            "Strategy game", "Massively multiplayer online role-playing", "Stealth", "Party", "Action RPG",
            "Tactical role-playing", "Survival", "Battle Royale"
        ];
        const games = [];

        for (let i = 0; i < numGames; i++) {
            const gameName = faker.word.words(3); // Generates a random game name
            const categories = faker.helpers.arrayElements(predefinedCategories, faker.number.int({ min: 1, max: 2 }));
            const img = faker.image.url();
            const description = faker.lorem.words({ min: 15, max: 30 });

            const game = new Game({
                gameName,
                categories,
                img,
                description
            });

            games.push(game);
        }

        // Insert games into the database
        await Game.insertMany(games);
        console.log(`${numGames} random games inserted successfully.`);
    } catch (err) {
        console.error('Error creating random games:', err);
    }
};

//createRandomGames(10);
import express from "express"
import Game from "../model/game.js";
import dotenv from "dotenv"

dotenv.config()

const routerGame = express.Router();

routerGame.get('/all_games', async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json({ games: games });
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

export default routerGame;
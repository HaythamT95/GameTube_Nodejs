import mongoose from "mongoose";
const { Schema } = mongoose;

const gameSchema = new Schema({
    gameName: {
        type: String
    },
    categories: [{
        type: String
    }],
    img: {
        type: String
    },
    description: {
        type: String
    }
});

export default mongoose.model("Game", gameSchema, "game");
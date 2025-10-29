// models/Quize.js
const mongoose = require('mongoose'); // <-- 1. You were missing this
const { Schema } = mongoose; // <-- 2. This line is fine

const quizeSchema = new Schema(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
    },
    {
        collection: 'quizes1', // <-- 3. Good practice to explicitly name the collection
        timestamps: true
    }
);

// 4. You were missing this line. This creates the model and exports it.
module.exports = mongoose.model('Quize', quizeSchema);
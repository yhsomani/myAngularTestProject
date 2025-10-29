const express = require('express');
const router = express.Router();
// Import the new model we just created
const TechnologyData = require('../modules/Technology');

// -------------------------------------------------
// GET all Technology Names
// -------------------------------------------------
router.get('/', async (req, res, next) => {
    try {
        // 1. Find the one single document in the collection
        const dataDoc = await TechnologyData.findOne({});

        if (!dataDoc) {
            // If the document doesn't exist, return an empty array
            return res.json([]);
        }

        // 2. Get the 'technologies' object from the document
        const technologiesObject = dataDoc.technologies;

        // 3. Get all the keys (e.g., "Angular", "React")
        const techNames = Object.keys(technologiesObject);

        // 4. Format the names into the array the frontend expects:
        //    [{ "name": "Angular" }, { "name": "React" }, ...]
        const formattedNames = techNames.map(name => ({
            name: name,
            _id: name // We can just use the name as an ID
        }));

        res.json(formattedNames);

    } catch (err) {
        next(err);
    }
});

// -------------------------------------------------
// GET ONE Technology by Name (with all questions)
// -------------------------------------------------
router.get('/:name', async (req, res, next) => {
    try {
        const techName = req.params.name;

        // 1. Find the one single document
        const dataDoc = await TechnologyData.findOne({});

        // 2. Check if that document AND the requested technology exist
        if (!dataDoc || !dataDoc.technologies[techName]) {
            return res.status(404).json({ msg: 'Technology not found' });
        }

        // 3. Get the specific array of questions
        const questions = dataDoc.technologies[techName];

        // 4. Format the response exactly as the frontend expects
        const response = {
            name: techName,
            questions: questions,
            _id: techName
        };

        res.json(response);

    } catch (err) {
        next(err);
    }
});

module.exports = router;
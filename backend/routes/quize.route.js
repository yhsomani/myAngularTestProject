// routes/quize.route.js
const express = require('express');
const router = express.Router();
const Quize = require('../modules/Quize'); // This will now correctly import the MODEL

// -------------------------------------------------
// GET all Quizes
// -------------------------------------------------
router.get('/', async (req, res, next) => {
    try {
        const quizes = await Quize.find({}); // This will now work
        res.json(quizes);
    } catch (err) {
        next(err);
    }
});

// -------------------------------------------------
// GET Quize by ID
// -------------------------------------------------
router.get('/:id', async (req, res, next) => {
    try {
        const quize = await Quize.findById(req.params.id);
        if (!quize) {
            return res.status(404).json({ msg: 'Quize not found' });
        }
        res.json(quize);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
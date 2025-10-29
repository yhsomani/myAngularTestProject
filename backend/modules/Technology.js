const mongoose = require('mongoose');
const { Schema } = mongoose;

// This schema defines the structure of the data:
// { "technologies": { "Angular": [...], "React": [...] } }
const technologySchema = new Schema(
    {
        // We are telling Mongoose that 'technologies' is a free-form Object
        // that will hold other keys and values.
        technologies: {
            type: Object,
            required: true
        },
    },
    {
        collection: 'technologies', // This must match your collection name
        timestamps: true
    }
);

// We export this model, but we will name it 'TechnologyData' 
// to avoid confusion with the old model.
module.exports = mongoose.model('TechnologyData', technologySchema);
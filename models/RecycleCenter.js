const mongoose = require('mongoose');

const recycleCenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    acceptedMaterials: {
        type: [String],
        default: [],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
}, {
    timestamps: true,
});

// Create 2dsphere index for geospatial queries
recycleCenterSchema.index({ location: '2dsphere' });

const RecycleCenter = mongoose.model('RecycleCenter', recycleCenterSchema);

module.exports = RecycleCenter;

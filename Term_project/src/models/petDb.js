const mongoose = require('mongoose');

const petitionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorImage: {
        type: String,
        required: true
    },
    supporters: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateSigned: {
        type: Date,
        required: true,
        default: Date.now
    },
    petitionId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('petDb', petitionSchema);

const express = require('express');
const router = express.Router();
const Petition = require('../models/petDb');

// Getting all petitions
router.get('/', async (req, res) => {
    try {
        const petitions = await Petition.find();
        res.json(petitions);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Getting a single petition
router.get('/:id', getPetition, (req, res) => {
    res.json(res.petition);
});

// Creating a new petition
router.post('/', async (req, res) => {
    const petition = new Petition({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        author: req.body.author,
        authorImage: req.body.authorImage,
        supporters: req.body.supporters,
        name: req.body.name,
        email: req.body.email,
        dateSigned: req.body.dateSigned,
        petitionId: req.body.petitionId
    });
    try {
        const newPetition = await petition.save();
        // Redirect to the homepage
        res.redirect('/');
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});


// Updating a petition
router.patch('/:id', getPetition, async (req, res) => {
    if (req.body.title != null) {
        res.petition.title = req.body.title;
    }
    if (req.body.description != null) {
        res.petition.description = req.body.description;
    }
    if (req.body.image != null) {
        res.petition.image = req.body.image;
    }
    if (req.body.author != null) {
        res.petition.author = req.body.author;
    }
    if (req.body.authorImage != null) {
        res.petition.authorImage = req.body.authorImage;
    }
    if (req.body.supporters != null) {
        res.petition.supporters = req.body.supporters;
    }
    if (req.body.name != null) {
        res.petition.name = req.body.name;
    }
    if (req.body.email != null) {
        res.petition.email = req.body.email;
    }
    if (req.body.dateSigned != null) {
        res.petition.dateSigned = req.body.dateSigned;
    }
    if (req.body.petitionId != null) {
        res.petition.petitionId = req.body.petitionId;
    }
    try {
        const updatedPetition = await res.petition.save();
        res.json(updatedPetition);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Deleting a petition
router.delete('/:id', getPetition, async (req, res) => {
    try {
        await Petition.findByIdAndRemove(req.params.id);
        res.json({message: 'Deleted Petition'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

async function getPetition(req, res, next) {
    let petition;
    try {
        petition = await Petition.findById(req.params.id);
        if (petition == null) {
            return res.status(404).json({message: 'Cannot find petition'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.petition = petition;
    next();
}

module.exports = router;

const express = require('express');
const router = express.Router();
const Role = require('../models/roleschema');
const cors = require('cors');
const app = express();
app.use(cors());

// Route to retrieve all roles
router.get('/', (req, res) => {
    Role.find()
        .then((roles) => {
            res.json(roles);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error retrieving roles' });
        });
});

// Route to create a new role
router.post('/', (req, res) => {
    const { title, permissions, description } = req.body;
    const newRole = new Role({ title, permissions, description });
    newRole.save()
        .then((role) => {
            res.status(201).json(role);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error creating role' });
        });
});

// Route to retrieve a specific role by ID
router.get('/:id', (req, res) => {
    const roleId = req.params.id;
    Role.findById(roleId)
        .then((role) => {
            if (role) {
                res.json(role);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error retrieving role' });
        });
});

// Route to update a specific role by ID
router.put('/:id', (req, res) => {
    const roleId = req.params.id;
    const { title, permissions, description } = req.body;
    Role.findByIdAndUpdate(roleId, { title, permissions, description }, { new: true })
        .then((role) => {
            if (role) {
                res.json(role);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error updating role' });
        });
});

// Route to delete a specific role by ID
router.delete('/:id', (req, res) => {
    const roleId = req.params.id;
    Role.findByIdAndDelete(roleId)
        .then((role) => {
            if (role) {
                res.sendStatus(204);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error deleting role' });
        });
});

module.exports = router;

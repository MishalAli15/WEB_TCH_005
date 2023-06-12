const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        // User is authenticated
        const userRole = req.session.user.role;

        // Check if the user role is authorized to access the protected route
        if (userRole === 'admin') {
            // User is authorized, allow access to the next middleware or route handler
            next();
        } else {
            // User is not authorized, return forbidden status
            res.status(403).json({error: 'Forbidden'});
        }
    } else {
        // User is not authenticated, return unauthorized status
        res.status(401).json({error: 'Unauthorized'});
    }
};


// Registration route
router.post('/signup', async (req, res) => {
    try {
        const {username, password, email} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({$or: [{username}, {email}]});
        if (existingUser) {
            return res.status(400).json({error: 'Username or email already exists'});
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        // Save the user to the database
        await newUser.save();

        res.status(200).json({message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred'});
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        // Check if user exists
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid password'});
        }

        // Set user session
        req.session.user = user;

        res.status(200).json({message: 'Login successful'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'An error occurred'});
    }
});

// Logout route
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy();

    res.status(200).json({message: 'Logout successful'});
});

// Protected route
router.get('/protected-route', authenticateUser, (req, res) => {
    // Protected route logic...
    res.json({message: 'Access granted to protected route'});
});

module.exports = router;

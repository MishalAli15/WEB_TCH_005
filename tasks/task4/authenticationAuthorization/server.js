const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user');
const path = require('path');
const axios = require('axios');

// Create the Express app
const app = express();

// Configure session middleware
const store = new MongoDBStore({
    uri: 'mongodb+srv://admin:123@voiceup.nvcfwhx.mongodb.net/', // Replace with your MongoDB connection string and database name
    collection: 'sessions',
});
app.get('/create', (req, res) => {
    res.render('create');
});
app.use(
    session({
        secret: 'secret-key', // Replace with your own secret key
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

// Connect to MongoDB
mongoose
    .connect('mongodb+srv://admin:123@voiceup.nvcfwhx.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error(error);
    });

// Set up middleware
app.use(express.static('Term_project'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'src')));

// Include the route handlers

const authRoutes = require('./src/routes/auth');
const petitionRouter = require('./src/routes/petition');
app.use(authRoutes);
app.use('/petition', petitionRouter);


// Fetch petitions data and render index.ejs
app.get('/', async (req, res) => {
    try {
        // Make an API call to fetch petitions data
        const response = await axios.get('http://localhost:3000/petition');
        const petitions = response.data;
        res.render('index', {petitions});
    } catch (error) {
        console.error(error);
        res.render('index', {petitions: []});
    }
});

// Render signin.ejs when /signin route is accessed
app.get('/signin', (req, res) => {
    res.render('signin');
});

// Render signup.ejs when /signup route is accessed
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Sign in user and create a session
app.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({email});

        // If user does not exist or password is incorrect, redirect back to signin page
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.redirect('/signin');
        }

        // Set the user in the session
        req.session.user = user;

        // Redirect to the profile page
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.redirect('/signin');
    }
});

// Log out user and destroy the session
app.get('/signout', (req, res) => {
    // Destroy the session
    req.session.destroy();

    // Redirect to the signin page
    res.redirect('/signin');
});
// Define the authenticateUser middleware
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.user) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated, redirect to signin page
        res.redirect('/signin');
    }
};

// Apply the authenticateUser middleware to the /profile route
app.get('/profile', authenticateUser, (req, res) => {
    // Render the profile page
    res.render('profile', {user: req.session.user});
});


app.get('/profile', authenticateUser, (req, res) => {
    // Check if user is authenticated and authorized
    if (req.session.user) {
        res.render('profile', {user: req.session.user});
    } else {
        res.redirect('/signin');
    }
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({error: 'Internal server error'});
});


// Perform the update operation
const db = mongoose.connection;
db.collection('users').updateOne(
    {username: 'admin'},
    {$set: {role: 'admin'}},
    (error, result) => {
        if (error) {
            console.error('Error updating user role:', error);
        } else {
            console.log('User role updated successfully');
        }
    }
);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

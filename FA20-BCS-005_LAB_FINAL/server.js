const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/roles');

const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// Establish a connection to the MongoDB database
mongoose.connect('mongodb+srv://admin:123@voiceup.nvcfwhx.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });

// Routes
app.use('/roles', routes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

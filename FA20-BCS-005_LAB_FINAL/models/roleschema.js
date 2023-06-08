// Import the necessary dependencies
const mongoose = require('mongoose');

// Define the role schema
const roleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Create the Role model based on the schema
const Role = mongoose.model('Role', roleSchema);

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

// Export the Role model
module.exports = Role;

// 1. Import the mongoose library
const mongoose = require('mongoose');

// 2. Define the schema for our contact form submissions
// This schema specifies the fields and their data types
const ContactFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of a string
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Automatically sets the current date
    }
});

// 3. Create the Mongoose model from the schema
// This is what we will use in our server to save new submissions
const ContactForm = mongoose.model('ContactForm', ContactFormSchema);

// 4. Export the model so we can use it in other files
module.exports = ContactForm;
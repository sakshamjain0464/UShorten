const express = require('express'); // Import express

const router = express.Router(); // Create a router

const shortenURL = require('../controllers/shortenURL'); // Import the shortenURL controller

const listURL = require('../controllers/listURL'); // Import the listURL controller

router.post('/shorten', shortenURL); // Handle POST requests to /url/shorten

router.post('/list', listURL); // Handle POST requests to /url/list





module.exports = router; // Export the router
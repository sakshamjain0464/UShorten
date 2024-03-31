const ShortUniqueId = require('short-unique-id');
const Url = require('../models/url.model');

const shortenURL = async (req, res) => {
    const originalUrl = req.body.url; // Get the originalUrl from the request body
    const userID = req.user._id;

    if (!originalUrl) { // If the originalUrl is not provided
        return res.status(400).json({ message: 'URL is required' }); // Return an error response
    }

    try {
        const isAlreadyPresent = await Url.findOne({ $and: [{ userID }, { originalUrl }] }); // Find a Url document with the originalUrl

        if (isAlreadyPresent) {
            return res.status(400).json({ message: 'URL is already present' }); // Return an error response
        }

        const shortID = generateShortID(); // Generate a shortID

        const url = new Url({ originalUrl, shortID, userID: req.user._id }); // Create a new Url document

        await url.save(); // Save the Url document

        res.json({ shortID: shortID}); // Send the Url document as a response
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const generateShortID = () => {
    const uid = new ShortUniqueId({ length: 10 });
    return uid.rnd();
}

module.exports = shortenURL; // Export the generateShortID function
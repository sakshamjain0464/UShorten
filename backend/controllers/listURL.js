const Url = require('../models/url.model'); // Import the Url model

const listURL = async (req, res) => {
    try {
        const urls = await Url.find({ userID: req.user._id }); // Find all Url documents with the userID
        res.json(urls); // Send the Url documents as a response
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = listURL; // Export the listURL function
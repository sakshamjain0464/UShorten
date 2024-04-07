const URL  = require('../models/url.model');

const deleteURL = async (req, res) => {

    console.log(req.body)

    const shortID = req.body.shortID;
    const userID = req.user._id;

    console.log(shortID, userID)

    try {
        const url = await URL.findOneAndDelete({userID, shortID});
        if(!url){
            return res.status(400).json({ message: 'URL not found' });
        }
        res.json({ message: 'URL deleted' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = deleteURL; // Export the deleteURL function
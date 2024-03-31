const Url = require('../models/url.model');

const verifyURL = async (req, res) => {
    console.log(req.params.shortID)
    const shortID = req.params.shortID;
   try{
    const url = await Url.findOneAndUpdate({ shortID }, { $inc: { clicks: 1 } });
    
    if(!url) {
        return res.status(404).json({ message: 'URL not found' });
    }

    res.json({ originalUrl: url.originalUrl });
   }
   catch(err){
       return res.status(500).json({message: err.message});
   }
};

module.exports = verifyURL;


const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();
const URI = process.env.MONGO_DB_LOCAL_URI

const connectToDb = () => {
  try {
    mongoose.connect(URI)
    console.log('Connected to database')
  } catch (error) {
    console.error('Error connecting to database', error)
  }
}

module.exports = connectToDb
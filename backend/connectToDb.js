const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();
const URI = process.env.MONGO_DB_LOCAL_URI

const connectToDb = async () => {
  try {
    await mongoose.connect(URI, {dbName: 'UShorten'})
    console.log('Connected to database')
  } catch (error) {
    console.error('Error connecting to database', error)
  }
}

module.exports = connectToDb
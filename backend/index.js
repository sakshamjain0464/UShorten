const express = require('express'); // Import express
const connectToDb = require('./connectToDb'); // Import the connectToDb function
const dotenv = require('dotenv');  // Import dotenv


connectToDb(); // Call the connectToDb function

const app = express(); // Create an express app
dotenv.config(); // Load the .env file

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
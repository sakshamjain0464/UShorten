const express = require('express'); // Import express
const connectToDb = require('./connectToDb'); // Import the connectToDb function
const dotenv = require('dotenv');  // Import dotenv
const userRouter = require('./routes/user.route'); // Import the user route
const authorization = require('./middlewares/authorization'); // Import the authorization middleware


connectToDb(); // Call the connectToDb function

const app = express(); // Create an express app
dotenv.config(); // Load the .env file

app.use(express.json()); // Enable the server to parse JSON bodies
app.use('/api/users', userRouter); // Use the user route for requests to the /api/users path


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
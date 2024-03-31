const express = require('express'); // Import express
const connectToDb = require('./connectToDb'); // Import the connectToDb function
const dotenv = require('dotenv');  // Import dotenv
const userRouter = require('./routes/user.route'); // Import the user route
const authorization = require('./middlewares/authorization'); // Import the authorization middleware
const urlRouter = require('./routes/url.route'); // Import the url route
const verifyUrl = require('./controllers/verifyUrl'); // Import the verifyUrl middleware
const cors = require('cors'); // Import cors

connectToDb(); // Call the connectToDb function

const app = express(); // Create an express app
dotenv.config(); // Load the .env file

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable the server to parse JSON bodies
app.use('/api/users', userRouter); // Use the user route for requests to the /api/users path
app.use('/url',authorization, urlRouter); // Use the authorization middleware

app.get('/verify/:shortID', verifyUrl)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
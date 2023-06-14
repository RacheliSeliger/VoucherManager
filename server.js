const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
// Create Express app

const app = express();

const port = 3000;

app.use(cors());

mongoose.connect('mongodb://localhost:27017/barcode', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


// Set up middleware and routes
app.use(express.json());
app.use('/api/vouchers', require('./routes/userRoutes'));


// CORS preflight request handler
app.options('/api/vouchers', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
  });
  
// Start the server
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
});


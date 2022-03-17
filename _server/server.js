const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());

const uri = process.env.DB_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {console.log("MongoDB databse connection established successfully")});

app.get('/', (req, res, err) => {
    res.send("Welcome to ASbackend");
})

app.listen(port, () => {console.log(`Server is running on port ${port}`)})
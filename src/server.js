const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const authRouter = require('./routes/authServer');
const Stats = require('./models/stats');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname,"../build")));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://grand-verve-343121.ue.r.appspot.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


app.use(cors({ origin: true, credentials: true }));
//app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cookieParser());

const uri = process.env.DB_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {console.log("MongoDB databse connection established successfully")});

app.use('/auth', authRouter);

app.get('/', auth, (req, res, err) => {
    if (!req.user) return res.sendStatus(403);
    res.send("Welcome to ASbackend");
})

app.post('/newStat', auth, async (req, res, err) => {
    if (!req.user) return res.sendStatus(403);
    console.log(req.body);
    const newStat = new Stats({
        username: req.user.username,
        level: req.body.level,
        algorithm: req.body.algorithm,
        time: req.body.time,
        lives: req.body.lives,
        success: req.body.success,
        timestamp: new Date().getTime()
    })
    console.log(newStat);
    let stat = await newStat.save();
    console.log(stat);
    if (!stat) return res.sendStatus(500);
    res.sendStatus(200);
})

app.get('/stats', auth, async (req, res, err) => {
    if (!req.user) return res.sendStatus(403);
    let statList = await (Stats.find({username:req.user.username}).sort({timestamp:-1}));
    res.json(statList);
})

app.get('/allStats', auth, async (req, res, err) => {
    console.log(req.user)
    if (!req.user.admin) return res.sendStatus(403);
    let statList = await (Stats.find().sort({timestamp:-1}));
    res.json(statList);
})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(port, () => {console.log(`Server is running on port ${port}`)})
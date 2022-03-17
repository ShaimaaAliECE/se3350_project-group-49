const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const authRouter = require('./routes/authServer');
const Stats = require('./models/stats');

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

app.use('/auth', authRouter);

app.get('/', auth, (req, res, err) => {
    if (!req.user) return res.send('Access Denied');
    res.send("Welcome to ASbackend");
})

app.post('/newStat', auth, async (req, res, err) => {
    if (!req.user) return res.send('Access Denied');
    console.log(req.user);
    const newStat = new Stats({
        username: req.user.username,
        level: req.body.level,
        algorithm: req.body.algorithm,
        time: req.body.time,
        lives: req.body.lives,
        success: req.body.success,
        timestamp: new Date().getTime()
    })
    let stat = await newStat.save();
    console.log(stat);
    if (!stat) return res.sendStatus(500);
    res.sendStatus(200);
})

app.get('/stats', auth, async (req, res, err) => {
    if (!req.user) return res.send('Access Denied');
    let statList = await (Stats.find({username:req.user.username}).sort({timestamp:-1}));
    res.json(statList);
})

app.get('/allStats', auth, async (req, res, err) => {
    console.log(req.user)
    if (!req.user.admin) return res.send('Access Denied');
    let statList = await (Stats.find().sort({timestamp:-1}));
    res.json(statList);
})

app.listen(port, () => {console.log(`Server is running on port ${port}`)})
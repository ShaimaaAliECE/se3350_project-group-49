const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: "Please enter all fields"});

    let user = await User.findOne({ username }).exec();

    if (user) return res.status(400).json({ msg:"This username is already registered!"});

    const newUser = new User({
        username,
        password,
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            let user = await newUser.save();
            let refreshToken = jwt.sign({id:user.id}, process.env.REFRESH_SECRET, {expiresIn:24*60*60});
            let accessToken = jwt.sign({id:user.id}, process.env.ACCESS_SECRET, {expiresIn:10*60});
            let matched = (await User.updateOne({id:user.id}, {refreshToken:refreshToken})).matchedCount; 
            if (!matched) return res.status(500).json({msg:"Unable to create refresh token"});
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000})
            res.json({accessToken});
        })
    })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ msg: "Please enter all fields"});

    let user = await User.findOne({ username });
    if(!user) return res.status(404).json({ msg:"User does not exist"});

    bcrypt.compare(password, user.password)
        .then(async isMatch => {
            if (!isMatch) return res.status(400).json({ msg: 'Incorrect Password'});
            let refreshToken = jwt.sign({id:user.id}, process.env.REFRESH_SECRET, {expiresIn:24*60*60});
            let accessToken = jwt.sign({id:user.id}, process.env.ACCESS_SECRET, {expiresIn:10*60});
            let matched = (await User.updateOne({id:user.id}, {refreshToken:refreshToken})).matchedCount; 
            if (!matched) return res.status(500).json({msg:"Unable to create refresh token"});
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000})
            res.json({accessToken});
        })
})

router.get('/refresh', async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies)
    console.log('jwt', cookies.jwt);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log('rt',refreshToken);

    const foundUser = await User.findOne({ refreshToken:refreshToken });
    console.log('user', foundUser);
    if (!foundUser) return res.sendStatus(403); //Forbidden 

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, user) => {
        if (err || foundUser.id != user.id) return res.sendStatus(403);
        let refreshToken = jwt.sign({id:user.id}, process.env.REFRESH_SECRET, {expiresIn:24*60*60});
        let accessToken = jwt.sign({id:user.id}, process.env.ACCESS_SECRET, {expiresIn:10*60});
        let matched = (await User.updateOne({id:user.id}, {refreshToken:refreshToken})).matchedCount; 
        if (!matched) return res.status(400).json({msg:"Unable to create refresh token"});
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000})
        res.json({accessToken});
    })
})

router.get('/logout', async (req,res) => {
    const cookies = req.cookies;
    console.log(cookies.jwt);
    if (!cookies?.jwt) return res.sendStatus(202);
    res.clearCookie('jwt');
    res.sendStatus(202);
})

module.exports = router;
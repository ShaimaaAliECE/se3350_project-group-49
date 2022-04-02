const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

router.get('/newAdmin', async (req,res,err) => {
    const newUser = new User({
        username:'admin',
        password:'root',
        admin:true
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            let user = await newUser.save();
            let refreshToken = jwt.sign({id:user.id}, process.env.REFRESH_SECRET, {expiresIn:24*60*60});
            let accessToken = jwt.sign({id:user.id}, process.env.ACCESS_SECRET, {expiresIn:10*60});
            let matched = (await User.findByIdAndUpdate(user.id, {refreshToken:refreshToken})); 
            if (!matched) return res.sendStatus(500);
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, secure:true, sameSite: 'none'})
            res.json({accessToken, admin:user.admin});
        })
    })
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) return res.sendStatus(400);

    let user = await User.findOne({ username });

    if (user) return res.sendStatus(400);

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
            let matched = (await User.findByIdAndUpdate(user.id, {refreshToken:refreshToken})); 
            if (!matched) return res.sendStatus(500);
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, secure:true, sameSite: 'none'})
            res.json({accessToken, admin:user.admin});
        })
    })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) return res.sendStatus(400);

    let user = await User.findOne({ username });
    if(!user) return res.sendStatus(404);
    bcrypt.compare(password, user.password)
        .then(async isMatch => {
            if (!isMatch) return res.sendStatus(400);
            let refreshToken = jwt.sign({id:user.id}, process.env.REFRESH_SECRET, {expiresIn:24*60*60});
            let accessToken = jwt.sign({id:user.id}, process.env.ACCESS_SECRET, {expiresIn:10*60});
            let matched = (await User.findByIdAndUpdate(user.id, {refreshToken:refreshToken})); 
            if (!matched) return res.sendStatus(500);
            console.log(user);
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, secure:true, sameSite: 'none'})
            res.json({accessToken, admin:user.admin});
        })
})

router.get('/refresh', async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies)
    console.log('jwt', cookies.jwt);
    if (!cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log('rt',refreshToken);

    const foundUser = await User.findOne({ refreshToken:refreshToken });
    console.log('user', foundUser);
    if (!foundUser) return res.sendStatus(401); //Forbidden 

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, user) => {
        if (err || foundUser.id != user.id) return res.sendStatus(401);
        let refreshToken = jwt.sign({id:user.id}, process.env.REFRESH_SECRET, {expiresIn:24*60*60});
        let accessToken = jwt.sign({id:user.id}, process.env.ACCESS_SECRET, {expiresIn:10*60});
        let matched = (await User.findByIdAndUpdate(user.id, {refreshToken:refreshToken})); 
        if (!matched) return res.sendStatus(500);
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, secure:true, sameSite: 'none'})
        res.json({accessToken, admin:foundUser.admin});
    })
})

router.get('/logout', async (req,res) => {
    const cookies = req.cookies;
    console.log(cookies.jwt);
    if (!cookies.jwt) return res.sendStatus(202);
    res.cookie('jwt', '', { httpOnly: true, maxAge: 24*60*60*1000, secure:true, sameSite: 'none'})
    res.clearCookie('jwt');
    res.sendStatus(202);
})

module.exports = router;

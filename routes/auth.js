const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const {SECRET_KEY, BCRYPT_WORK_FACTOR} = require("../config");
const User = require("../models/users")

router.post('/register', async (req, res, next) => {
    try{
        const {password} = req.body;
        const hash_paswd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        // req.body.password = hash_paswd;
        console.log(req.body)
        let user = await User.registerUser(req.body)
        return res.json({user})
    } catch(e) {
        return next(e)
    }
})

module.exports = router;
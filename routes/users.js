const Router = require('express').Router;
const User = require('../models/users');

const router = new Router();


router.all('/', async (req, res, next) => {
    try {
        let users = await User.all()
        // console.log(users)
        return res.json(users)
    } catch(e) {
        return next(e)
    }
})
router.get("/:id", async (req, res, next) => {
    try {
        let user = await User.get(req.params.id)
        return res.json({user})
    } catch(e) {
        return next(e)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        let user = await User.registerUser(req.body)
        return res.json({user})
    } catch(e) {
        next(e)
    }
})

router.patch("/edit", async (req, res, next) => {
    try {
        let user = await User.editUser(req.body)
        return res.json({user})
    } catch(e) {
        next(e)
    }
})

router.delete("/delete/:id", async (req, res, next) => {
    try{
        let user = await User.deleteUser(req.params.id)
        return res.json({user})
    } catch(e) {
        next(e)
    }
})

module.exports = router
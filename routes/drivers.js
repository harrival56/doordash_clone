const Router = require('express').Router;
const Driver = require('../models/drivers');

const router = new Router();


router.all('/', async (req, res, next) => {
    try {
        let drivers = await Driver.all()
        return res.json(drivers)
    } catch(e) {
        return next(e)
    }
})
router.get("/:email", async (req, res, next) => {
    try {
        let driver = await Driver.get(req.params.email)
        return res.json({driver})
    } catch(e) {
        return next(e)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        let user = await Driver.registerDriver(req.body)
        return res.json({user})
    } catch(e) {
        next(e)
    }
})

router.patch("/edit", async (req, res, next) => {
    try {
        let user = await Driver.editDriver(req.body)
        return res.json({user})
    } catch(e) {
        next(e)
    }
})

module.exports = router
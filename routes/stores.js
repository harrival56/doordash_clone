const Router = require('express').Router;
const Store = require('../models/stores');

const router = new Router();


router.all('/', async (req, res, next) => {
    try {
        let stores = await Store.all()
        return res.json(stores)
    } catch(e) {
        return next(e)
    }
})
router.get("/:store_name", async (req, res, next) => {
    try {
        let store = await Store.get(req.params.store_name)
        const {id, store_name, address} = store[0];
        const menu = store.map(item => [{
            store_item: item.store_item,
            category: item.category,
            price:item.price
        }])
        return res.send({id, store_name, address, menu})
    } catch(e) {
        return next(e)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        let store = await Store.registerStore(req.body)
        return res.json({store})
    } catch(e) {
        next(e)
    }
})

router.patch("/edit", async (req, res, next) => {
    try {
        let store = await Store.editStore(req.body)
        return res.json({store})
    } catch(e) {
        next(e)
    }
})

router.delete("/delete/:id", async (req, res, next) => {
    try{
        let store = await Store.deleteStore(req.params.id)
        return res.json({store})
    } catch(e) {
        next(e)
    }
})

module.exports = router
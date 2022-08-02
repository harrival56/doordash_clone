const Router = require('express').Router;
const db = require('../db');
const Order = require('../models/orders');

const router = new Router();


router.all('/', async (req, res, next) => {
    try {
        let orders = await Order.all()
        return res.json(orders)
    } catch(e) {
        return next(e)
    }
})
router.get("/:id", async (req, res, next) => {
    console.log("in here")
    try {
        let order = await Order.get(req.params.id)
        return res.json({order})
    } catch(e) {
        return next(e)
    }
})

router.post("/createorder", async (req, res, next) => {
    try {
        const orderInfo = req.body;
        const order = await Order.createOrder(orderInfo)
        // const resp = res.json({order_id:order.id, ordered_item:orderInfo.ordered_item})
        let results = orderInfo.ordered_items.map(item => {
        //     console.log("routing")
        console.log(orderInfo.ordered_items)
            Order.createOrdered_item(order.id, item)
        })
    
        console.log("back to route")
        return res.json({results})

    }catch (e) {
        return next(e)

    }
})

module.exports = router
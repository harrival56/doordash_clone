const express = require("express");
const morgan = require("morgan");
const ExpressError = require("./ExpressError")

const app = express();

app.use(express.json());
app.use(morgan('dev'))

const aRouter = require('./routes/auth')
const uRouter = require('./routes/users')
const dRouter = require('./routes/drivers')
const sRouter = require('./routes/stores')
const oRouter = require('./routes/orders')

app.use('/auth', aRouter)
app.use('/users', uRouter)
app.use('/drivers', dRouter)
app.use('/stores', sRouter)
app.use('/orders', oRouter)

app.use((req, res, next) => {
    const e = new ExpressError("Page not found", 404)
    next(e)
})

app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.use((error, req, res, nexxt) => {
    let status = error.status || 500;
    let msg = error.msg;
    return res.status(status).json({
        error: {msg, status}
    });
})

module.exports = app


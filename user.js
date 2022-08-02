// const db = require("./db");
// const express = require("express");
// const Router = require('express').Router;
// const router = new Router();

// router.get('/:id', async (req, res, next) => {
//     console.log(req.params.id)
//     try {
//         const results = await db.query(`
//         SELECT * FROM users where id = ${req.params.id}`)
//         return res.send( results.rows[0] )
//     } catch(e) {
//         return next(e)
//     }
// })

// module.exports = router
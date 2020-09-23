// import express
// import bids model
const express = require("express")
const Bids = require("../models/bids-model")

// make router
const router = express.Router()

// make endpoints

// bid = {
//  buyer_user_id - int
//  item_id - int
//  time - time
//  amount - float
// }

// get all bids - "baseurl/bids"
// GET /bids
router.get("/bids", async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

// bid by id - "baseurl/bids/:id"
// GET /bids/:id
router.get("/bids/:id", async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

// rest of the bid endpoints - "baseurl/item/item_id/bids
// GET /bids/:item_id
router.get("/items/:item_id/bids", async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

// POST /bids
router.post("/items/:item_id/bids", async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

// DELETE /bids/:id
router.delete("/items/:item_id/bids/:id", async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

// PUT /bids/:id
router.delete("/items/:item_id/bids/:id", async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
})

// export router
module.exports = router
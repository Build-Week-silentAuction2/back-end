// import express
// import bids model
const express = require("express")
const Bids = require("../models/bids-model")

// make router
const router = express.Router()

// make endpoints

// get all bids - "baseurl/bids"
// GET /bids
router.get("/bids", async (req, res, next) => {
    try {
        const bids = await Bids.find()
        res.json(bids)
    } catch (err) {
        next(err)
    }
})

// bid by id - "baseurl/bids/:id"
// GET /bids/:id
router.get("/bids/:id", async (req, res, next) => {
    try {
        const bid = await Bids.findById(req.params.id)
        if (!bid) {
            res.status(404).json({
                message: "Bid not found"
            })
        }
        res.json(bid)
    } catch (err) {
        next(err)
    }
})

// rest of the bid endpoints - "baseurl/item/item_id/bids
// GET /bids/:item_id
router.get("/items/:item_id/bids", async (req, res, next) => {
    try {
        const bids = await Bids.findByItem(req.params.item_id)
        res.json(bids)
    } catch (err) {
        next(err)
    }
})

// bid = {
//  buyer_user_id - int
//  item_id - int
//  time - time
//  amount - float
// }

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + ' ' + time;
// POST /bids
router.post("/items/:item_id/bids", async (req, res, next) => {
    try {
        if (!req.body || !req.body.buyer_user_id || !req.body.item_id || !req.body.amount) {
            return res.status(400).json({
                message: "Please provide complete bid information"
            })
        }
        const newBid = {
            buyer_user_id: req.body.buyer_user_id,
            item_id: req.body.item_id,
            time: dateTime,
            amount: req.body.amount
        }
        const bid = await Bids.insert(newBid)
        res.status(201).json(bid)
    } catch (err) {
        next(err)
    }
})

// DELETE /bids/:id
router.delete("/items/:item_id/bids/:id", async (req, res, next) => {
    try {
        const bid = await Bids.findById(req.params.id)
        if (!bid) {
            return res.status(404).json({
                message: "Bid not found"
            })
        }
        const result = await Bids.remove(req.params.id)
        if (!result) {
            return res.status(500).json({
                message: "Bid could not be deleted"
            })
        }
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

// PUT /bids/:id
router.put("/items/:item_id/bids/:id", async (req, res, next) => {
    try {
        if (!req.body || !req.body.buyer_user_id || !req.body.item_id || !req.body.amount) {
            return res.status(400).json({
                message: "Please provide complete bid information"
            })
        }
        const bid = await Bids.findById(req.params.id)
        if (!bid) {
            return res.status(404).json({
                message: "Bid not found"
            })
        }
        const updates = {
            buyer_user_id: req.body.buyer_user_id,
            item_id: req.body.item_id,
            time: dateTime,
            amount: req.body.amount
        }
        const updatedBid = await Bids.update(req.params.id, updates)
        if (!updatedBid) {
            return res.status(500).json({
                message: "Bid could not be updated"
            })
        }
        res.status(200).json(updatedBid)
    } catch (err) {
        next(err)
    }
})

// export router
module.exports = router
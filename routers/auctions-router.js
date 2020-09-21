// import express
const express = require("express")

// import auctions model
const Auctions = require("../models/auctions-model")

// make router
const router = express.Router()

// make endpoints

// GET /auctions
router.get("/", async (req, res, next) => {
    try {
        const auctions = await Auctions.find()
        res.json(auctions)
    } catch (err) {
        next(err)
    }
})

// GET /auctions/:id
router.get("/:id", async (req, res, next) => {
    try {
        const auction = await Auctions.findById(req.params.id)
        if (!auction) {
            res.status(404).json({
                message: "Auction not found"
            })
        }
        res.json(auction)
    } catch (err) {
        next(err)
    }
})

// POST /auctions
router.post("/", async (req, res, next) => {
    try {
        if (!req.body || !req.body.user_id || !req.body.name || !req.body.exp_date) {
            return res.status(400).json({
                message: "Please provide complete auction information"
            })
        }
        const newAuction = {
            user_id: req.body.user_id,
            name: req.body.name,
            exp_date: req.body.exp_date
        }
        const auction = await Auctions.insert(newAuction)
        res.status(201).json(auction)
    } catch (err) {
        next(err)
    }
})

// DELETE /auctions/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const auction = await Auctions.findById(req.params.id)
        if (!auction) {
            return res.status(404).json({
                message: "Auction not found"
            })
        }
        const result = await Auctions.remove(req.params.id)
        if (!result) {
            return res.status(500).json({
                message: "Auction could not be deleted"
            })
        }
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

// PUT /auctions/:id
router.put("/:id", async (req, res, next) => {
    try {
        if (!req.body || !req.body.user_id || !req.body.name || !req.body.exp_date) {
            return res.status(400).json({
                message: "Please provide complete auction information"
            })
        }
        const auction = await Auctions.findById(req.params.id)
        if (!auction) {
            return res.status(404).json({
                message: "Auction not found"
            })
        }
        const updates = {
            user_id: req.body.user_id,
            name: req.body.name,
            exp_date: req.body.exp_date
        }
        const updatedAuction = await Auctions.update(req.params.id, updates)
        if (!updatedAuction) {
            return res.status(500).json({
                message: "Auction could not be updated"
            })
        }
        res.status(200).json(updatedAuction)
    } catch (err) {
        next(err)
    }
})

// export router
module.exports = router
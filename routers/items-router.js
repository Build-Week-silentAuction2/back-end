const Items = require("../models/items-model")
const router = require("express").Router()

router.get('/', async (req, res, next) => {
    try{
        const item = await Items.findAll()
        res.json(item)
    }
    catch(err){
        next(err)
    }
})

router.get("/:id", async(req, res, next) => {
    try {
        const item = await Items.findById(req.params.id)
        if (!item) {
            res.status(404).json({
                message: "Item not found"
            })
        }
        res.json(item)
    } catch (err) {
        next(err)
    }
})

router.get("/seller/:id", async(req, res, next) =>{
    try{
        const sellerItems = await Items.findBySeller(req.params.id)
        if (!sellerItems) {
            res.status(404).json({
                message: "Seller not found"
            })
        }
        res.json(sellerItems)
    }
    catch(err){
        next(err)
    }
})

router.get("/auction/:id", async(req, res, next) =>{
    try{
        const auctionItems = await Items.findByAuction(req.params.id)
        // console.log(auctionItems)
        if (!auctionItems) {
            res.status(404).json({
                message: "Seller not found"
            })
        }
        res.json(auctionItems)
    }
    catch(err){
        next(err)
    }
})

module.exports = router
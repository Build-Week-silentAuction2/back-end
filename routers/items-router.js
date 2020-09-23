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

router.post("/", async(req, res, next) => {
    try{
        if(!req.body || !req.name || !req.image || !req.description || !req.price || !req.seller_user_id || !req.auction_id){
            return res.status(400).json({
                message: "Not all data needed was provided. Make sure you include a name, image url, description, price, seller id and auction id"
            })
        }
        else{
            const newItem = {
                name: req.body.name,
                image: req.body.image
            }
        }
    }
    catch(err){
        next(err)
    }
})

module.exports = router
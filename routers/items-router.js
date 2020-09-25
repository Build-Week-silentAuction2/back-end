const Items = require("../models/items-model")
const router = require("express").Router()
const restrict = require("../middleware/restrict")

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

router.post("/", restrict(), async(req, res, next) => {
    try{
        if(!req.body || !req.body.name || !req.body.image || !req.body.description || !req.body.price || !req.body.seller_user_id || !req.body.auction_id){
            return res.status(400).json({
                message: "Not all data needed was provided. Make sure you include a name, image url, description, price, seller id and auction id"
            })
        }
        else{
            const newItem = {
                name: req.body.name,
                image: req.body.image,
                description: req.body.description,
                price: req.body.price,
                seller_user_id: req.body.seller_user_id,
                auction_id: req.body.auction_id
            }
            const items = await Items.insert(newItem)
            res.status(201).json(items)
        }
    }
    catch(err){
        next(err)
    }
})

router.put("/:id", restrict(), async(req, res, next) => {
    try{
        if(!req.body){
            return res.status(400).json({
                message: "please edit something"
            })
        }
        else if(!Items.findById(req.params.id)){
            return res.status(404).json({
                message: "Could not find Item"
            })
        }
        
        const updatedItem = await Items.edit(req.params.id, req.body)
        if(!updatedItem){
            return res.status(500).json({
                message: "Could not edit Item"
            })
        }
        res.status(200).json(updatedItem)
    }
    catch(err){
        next(err)
    }
})

router.delete("/:id", restrict(), async(req, res, next) => {
    try{
        const item = await Items.findById(req.params.id)
        if(!item){
            return res.status(404).json({
                message: "Item not found"
            }) 
        }
        const newList = await Items.remove(req.params.id)
        if (!newList){
            return res.status(500).json({
                message: "Item could not be deleted"
            })
        }
        res.status(204).end()
    }
    catch(err){
        next(err)
    }
})

module.exports = router
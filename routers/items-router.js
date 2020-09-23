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

module.exports = router
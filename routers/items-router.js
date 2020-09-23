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

module.exports = router
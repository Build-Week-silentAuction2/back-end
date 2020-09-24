const db = require("../data/dbConfig")

//Add

async function insert(item) {
    const [id] = await db("Items").insert(item).returning("id")
    return findById(id)
}

//Get
function findAll() {
    return db("Items as i")
        .leftJoin("Users as u", "i.seller_user_id", "u.id")
        .select( "i.id", "i.name", "i.image", "i.description", "i.price", "u.username as SellerName", "i.auction_id as Auction"  )
}

function findById(itemId){
    return db("Items")
        .where("id", itemId)
        .first()
}

function findBySeller(sellerId){
    return db("Items as i")
        .join("Users as u", "i.seller_user_id", "u.id")
        .where("u.id", sellerId)
        .select( "i.name", "i.image", "i.description", "i.price" )
}

function findByAuction(auctionId){
    return db("Items as i")
        .join("Auctions as a", "i.auction_id", "a.id")
        .where("a.id", auctionId)
        .select( "i.name", "i.image", "i.description", "i.price" )
}

//Modify

async function edit(itemId, newItem){
    await db("Items")
        .where("id", itemId)
        .update(newItem)
    return await findById(itemId)
}

//Delete

async function remove(id){
    return db("Items")
        .where("id", id)
        .del()
}

module.exports = {
    insert,
    findAll,
    findById,
    findBySeller,
    findByAuction,
    edit,
    remove
}
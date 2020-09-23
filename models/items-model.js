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
        .select( "i.id", "i.name", "i.image", "i.description", "i.price", "u.username as SellerName", "i.auction_id as auction"  )
}

function findById(itemId){
    return db("Items")
        .where("id", itemId)
        .first()
}

function findBySeller(sellerId){
    return db("Items as i")
        .join("Users as u", "i.seller_user_id", "u.id")
        .where(sellerId)
        .select( "i.name", "i.image", "i.description", "i.price" )
}

function findAuction(auctionId){
    return db("Items as i")
        .join("Auctions as a", "i.seller_user_id", "a.id")
        .where(auctionId)
        .select( "i.name", "i.image", "i.description", "i.price" )
}

//Modify
//Delete

module.exports = {
    insert,
    findAll,
    findBySeller,
    findAuction,
}
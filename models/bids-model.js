// import db
const db = require("../data/dbConfig")

// make helper methods

// add bid
async function insert(bid) {
    const [id] = await db("Bids").insert(bid).returning("id")
    return findById(id)
}

// get bids
function find() {
    return db("Bids")
}

// get bid by id
function findById(id) {
    return db("Bids").where("id", id).first()
}

// git bids by item
function findByItem(item_id) {
    return db("Bids as b")
        .join("Items as i", "i.id", "b.item_id")
        .where("i.id", item_id)
        .select("i.name as item_name", "i.price as item_price", "i.description as item_description", "i.image as item_image", "i.seller_user_id", "i.auction_id", "b.id as bid_id", "b.amount as bid_amount", "b.buyer_user_id", "b.time as bid_time")
        .orderBy("bid_amount", "desc")
}

// delete bid
function remove(id) {
    return db("Bids").where("id", id).del()
}

// update bid
async function update(id, bid) {
    await db("Bids").where("id", id).update(bid)
    const updatedBid = await findById(id)
    return updatedBid;
}

// export helper methods
module.exports = {
    insert,
    find,
    findById,
    findByItem,
    remove,
    update
}
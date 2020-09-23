// import db
const db = require("../data/dbConfig")

// make helper methods

// add bid
async function insert(bid) {

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

}

// delete bid
function remove(id) {
    return db("Bids").where("id", id).del()
}

// update bid
async function update(id, bid) {

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
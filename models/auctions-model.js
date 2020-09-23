// import db
const db = require("../data/dbConfig")

// make helper methods

// add auction
async function insert(auction) {
    const [id] = await db("Auctions").insert(auction).returning("id")
    return findById(id)
}

// get auctions
function find() {
    return db("Auctions")
}

// get auction by id
function findById(id) {
    return db("Auctions").where("id", id).first()
}

// delete auction
function remove(id) {
    return db("Auctions").where("id", id).del()
}

// update auction
async function update(id, auction) {
    const response = await db("Auctions").where("id", id).update(auction, ["id"])
    console.log(response)
    if (!response) {
        return { auctionsUpdated: response }
    }
    return findById(id)
}

// export helper methods
module.exports = {
    insert,
    find,
    findById,
    remove,
    update
}
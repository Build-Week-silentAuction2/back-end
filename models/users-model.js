const db = require("../data/dbConfig")

async function add(user){

}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
        .where(filter)
}

module.exports = {
    add,
    findBy
}
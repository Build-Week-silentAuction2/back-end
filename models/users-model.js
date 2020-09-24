const db = require("../data/dbConfig")

async function add(user) {
    const [id] = await db("Users").insert(user).returning("id")
    return findById(id)
}

function findBy(filter) {
    return db("Users")
        .select("id", "username", "password", "role_id")
        .where(filter)
}

function findById(id) {
    return db("Users")
        .select("id", "username", "role_id")
        .where({ id })
        .first()
}

function getRolebyId(id) {
    const role = findById(id).role_id
    return db("Users as u")
        .join("Roles as r", "u.role_id", "r.id")
        .where(role)
        .select("r.name")
}
function findAll() {
    return db("Users").select("id", "role_id", "username",)
}

module.exports = {
    add,
    findBy,
    findById,
    getRolebyId,
    findAll
}
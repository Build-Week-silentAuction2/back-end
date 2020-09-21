const bcrypt = require("bcryptjs")

exports.seed = async function (knex) {
  await knex("Users").insert([
    { role_id: knex.select("id").from("Roles").where("name", "Buyer"), username: "buyer1", password: await bcrypt.hash("abc123", 14) },
    { role_id: knex.select("id").from("Roles").where("name", "Seller"), username: "seller1", password: await bcrypt.hash("abc123", 14) }
  ])
}

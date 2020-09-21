const bcrypt = require("bcryptjs")

exports.seed = async function (knex) {
  await knex("Users").insert([
    { role_id: 1, username: "buyer1", password: await bcrypt.hash("abc123", 14) },
    { role_id: 2, username: "seller1", password: await bcrypt.hash("abc123", 14) },
    { role_id: 1, username: "buyer2", password: await bcrypt.hash("abc123", 14) },
  ])
}

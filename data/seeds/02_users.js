const bcrypt = require("bcryptjs")

exports.seed = async function (knex) {
  return knex("Users").del().then(function () {
    return knex("Users").insert([
      { role_id: 1, username: "buyer1", password: "abc123" },
      { role_id: 2, username: "seller1", password: "abc123" },
      { role_id: 1, username: "buyer2", password: "abc123" },
    ])
  })
  // await knex("Users").insert([
  //   { role_id: 1, username: "buyer1", password: await bcrypt.hash("abc123", 14) },
  //   { role_id: 2, username: "seller1", password: await bcrypt.hash("abc123", 14) },
  //   { role_id: 1, username: "buyer2", password: await bcrypt.hash("abc123", 14) },
  // ])
}

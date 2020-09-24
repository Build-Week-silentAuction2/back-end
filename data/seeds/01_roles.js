exports.seed = async function (knex) {
  return knex("Roles").del().then(function () {
    return knex("Roles").insert([
      { name: "Buyer" },
      { name: "Seller" }
    ])
  })
}

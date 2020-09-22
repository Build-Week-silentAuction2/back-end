exports.seed = async function (knex) {
  // put this instead
  return knex("Roles").del().then(function () {
    return knex("Roles").insert([
      { name: "Buyer" },
      { name: "Seller" }
    ])
  })
  // await knex("Roles").insert([
  //   { name: "Buyer" },
  //   { name: "Seller" }
  // ])
}

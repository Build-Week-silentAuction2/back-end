exports.seed = async function (knex) {
  await knex("Roles").insert([
    { name: "Buyer" },
    { name: "Seller" }
  ])
}

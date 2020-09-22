exports.seed = async function (knex) {
  // put this instead
  // return knex("users").del().then(function() {
  //   return knex("users").insert([
  await knex("Roles").insert([
    { name: "Buyer" },
    { name: "Seller" }
  ])
}

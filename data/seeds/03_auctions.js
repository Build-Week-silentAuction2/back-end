exports.seed = async function (knex) {
  return knex("Auctions").del().then(function () {
    return knex("Auctions").insert([
      { user_id: 2, name: "First Charity Auction", exp_date: "10-01-2020" }
    ])
  })
}

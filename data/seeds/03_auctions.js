exports.seed = async function (knex) {
  await knex("Auctions").insert([
    { user_id: 2, name: "First Charity Auction", exp_date: knex.raw("date('now', 'start of day', '+2 days')") }
  ])
}

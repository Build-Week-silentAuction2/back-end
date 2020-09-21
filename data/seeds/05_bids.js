exports.seed = async function (knex) {
  await knex("Bids").insert([
    { seller_user_id: 2, item_id: 1, amount: 260.00 }
  ])
}

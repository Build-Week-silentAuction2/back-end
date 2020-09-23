exports.seed = async function (knex) {
  return knex("Bids").del().then(function () {
    return knex("Bids").insert([
      { buyer_user_id: 1, item_id: 1, amount: 260.00 },
      { buyer_user_id: 3, item_id: 1, amount: 300.00 },
      { buyer_user_id: 1, item_id: 1, amount: 320.00 },
      { buyer_user_id: 1, item_id: 2, amount: 11.00 },
      { buyer_user_id: 3, item_id: 2, amount: 13.00 },
      { buyer_user_id: 1, item_id: 2, amount: 15.00 },
      { buyer_user_id: 3, item_id: 2, amount: 20.00 },
      { buyer_user_id: 3, item_id: 3, amount: 770.00 },
      { buyer_user_id: 1, item_id: 3, amount: 800.00 },
      { buyer_user_id: 3, item_id: 3, amount: 850.00 },
      { buyer_user_id: 1, item_id: 3, amount: 975.00 },
    ])
  })
  // await knex("Bids").insert([
  //   { buyer_user_id: 1, item_id: 1, amount: 260.00 },
  //   { buyer_user_id: 3, item_id: 1, amount: 300.00 },
  //   { buyer_user_id: 1, item_id: 1, amount: 320.00 },
  //   { buyer_user_id: 1, item_id: 2, amount: 11.00 },
  //   { buyer_user_id: 3, item_id: 2, amount: 13.00 },
  //   { buyer_user_id: 1, item_id: 2, amount: 15.00 },
  //   { buyer_user_id: 3, item_id: 2, amount: 20.00 },
  //   { buyer_user_id: 3, item_id: 3, amount: 770.00 },
  //   { buyer_user_id: 1, item_id: 3, amount: 800.00 },
  //   { buyer_user_id: 3, item_id: 3, amount: 850.00 },
  //   { buyer_user_id: 1, item_id: 3, amount: 975.00 },
  // ])
}

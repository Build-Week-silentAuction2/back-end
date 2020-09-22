exports.seed = async function (knex) {
  await knex("Bids").truncate()
  await knex("Items").truncate()
  await knex("Auctions").truncate()
  await knex("Users").truncate()
  await knex("Roles").truncate()
}

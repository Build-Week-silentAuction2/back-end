// exports.seed = async function (knex) {
//   await knex("Roles").truncate()
//   await knex("Users").truncate()
//   await knex("Auctions").truncate()
//   await knex("Items").truncate()
//   await knex("Bids").truncate()
//   //await knex.raw('TRUNCATE TABLE Items, Users CASCADE')
// }


const cleaner = require("knex-cleaner");
exports.seed = function (knex) {
  return cleaner.clean(knex, {
    ignoreTables: ["knex_migrations", "knex_migrations_lock"] // don't empty migration tables
  });
};

exports.up = async function (knex) {
    await knex.schema.createTable("Roles", (table) => {
        table.increments();
        table.string("name").notNullable()
    })

    await knex.schema.createTable('Users', (table) => {
        table.increments();
        table
            .integer("role_id")
            .references("id")
            .inTable("Roles")
            .onDelete("SET NULL")
            .defaultTo("buyer")

        table
            .string("username")
            .notNullable()
            .unique()

        table
            .string("password")
            .notNullable()

    })

    await knex.schema.createTable("Auctions", (table) => {
        table.increments()
        table
            .integer("user_id")
            .references("id")
            .inTable("Users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
            .notNullable()

        table
            .string("name")
            .notNullable()

        table
            .date("exp_date")
            .notNullable()

    })

    await knex.schema.createTable("Items", (table) => {
        table.increments()
        table
            .string("name")
            .notNullable()
        table
            .string("image")
            .notNullable()
        table
            .string("description")
            .notNullable()
        table
            .float("price")
            .notNullable()
        table
            .integer("seller_user_id")
            .references("id")
            .inTable("Users")
            .notNullable()
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table
            .integer("auction_id")
            .references("id")
            .inTable("Auctions")
            .notNullable()
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })

    await knex.schema.createTable("Bids", (table) => {
        table.increments()
        table
            .integer("buyer_user_id")
            .references("id")
            .inTable("Users")
            .notNullable()
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table
            .integer("item_id")
            .references("id")
            .inTable("Items")
            .notNullable()
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table
            .time("time")
            .defaultTo(knex.raw("current_timestamp"))
            .notNullable()
        table
            .float("amount")
            .notNullable()
    })

};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('Bids')
    await knex.schema.dropTableIfExists('Items')
    await knex.schema.dropTableIfExists('Auctions')
    await knex.schema.dropTableIfExists('Users')
    await knex.schema.dropTableIfExists('Roles')
};

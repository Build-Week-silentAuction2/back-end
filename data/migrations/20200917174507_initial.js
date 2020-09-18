
exports.up = async function(knex) {
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

};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('Auctions')
    await knex.schema.dropTableIfExists('Users')
    await knex.schema.dropTableIfExists('Roles')
};

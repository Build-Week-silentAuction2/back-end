const knex = require("knex")
const knexfile = require("../knexfile")

require("dotenv").config()
//const environment = process.env.NODE_ENV || "development"
const environment = process.env.NODE_ENV || "development"

module.exports = knex(knexfile[environment])
//module.exports = knex(knexfile.development)
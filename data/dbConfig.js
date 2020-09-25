const knex = require("knex")
const knexfile = require("../knexfile")

require("dotenv").config()
//const environment = process.env.NODE_ENV || "development"
const environment = process.env.NODE_ENV || "development"

const testing = "testing"
module.exports = knex(knexfile[testing])
//module.exports = knex(knexfile.development)
const express = require("express")
const cors = require("cors")
// import router

const server = express()

server.get("/", (req, res) => {
    res.json({
        message: "Welcome to our API"
    })
})

module.exports = server

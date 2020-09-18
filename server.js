const express = require("express")
const cors = require("cors")
const usersRouter = require("./routers/users-router")
// import router

const server = express()
server.use(cors())

server.get("/", (req, res) => {
    res.json({
        message: "Welcome to our API"
    })
})
server.use('users', usersRouter);
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server

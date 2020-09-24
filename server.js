const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const usersRouter = require("./routers/users-router")
const auctionsRouter = require("./routers/auctions-router")
const itemsRouter = require("./routers/items-router")
const bidsRouter = require("./routers/bids-router")
// import router

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API"
	})
})
server.use('/users', usersRouter);
server.use('/auctions', auctionsRouter);
server.use('/items', itemsRouter);
server.use(bidsRouter);
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server

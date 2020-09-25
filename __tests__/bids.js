// import supertest
// import server
// import db
const supertest = require("supertest")
const server = require("../server")
const db = require("../data/dbConfig")

// jest hooks
beforeEach(async () => {
    // reseed database before each test
    await db.seed.run()
})

afterAll(async () => {
    // close database connection after last test
    await db.destroy()
})

// write tests

describe("bids integration tests", () => {
    it("GET /bids, gets all bids", async () => {
        // make get request to /bids
        const res = await supertest(server).get("/bids")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(11)
        expect(res.body[0].amount).toBe(260)
    })

    it("GET /bids/:id, gets specific bid", async () => {
        // make get request to /bids
        const res = await supertest(server).get("/bids/3")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.amount).toBe(320)
    })

    it("GET /bids/:id, invalid id", async () => {
        // make get request to /bids
        const res = await supertest(server).get("/bids/89")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Bid not found")
    })

    it("GET /items/:item_id/bids, gets all bids for specific item", async () => {
        // make get request to /bids
        const res = await supertest(server).get("/items/2/bids")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(4)
        expect(res.body[0].bid_amount).toBe(20)
    })

    it("GET /items/:item_id/bids, invalid item_id", async () => {
        // make get request to /bids
        const res = await supertest(server).get("/items/19/bids")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Item not found")
    })

    it("POST /items/:item_id/bids, adds bid for specific item", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .post("/items/3/bids")
            .send({
                buyer_user_id: 3,
                item_id: 3,
                amount: 1000.00
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.amount).toBe(1000.00)
    })

    it("POST /items/:item_id/bids, no buyer_user_id provided", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .post("/items/3/bids")
            .send({
                item_id: 3,
                amount: 1000.00
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide complete bid information")
    })

    it("POST /items/:item_id/bids, no item_id provided", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .post("/items/3/bids")
            .send({
                buyer_user_id: 3,
                amount: 1000.00
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide complete bid information")
    })

    it("POST /items/:item_id/bids, no amount provided", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .post("/items/3/bids")
            .send({
                buyer_user_id: 3,
                item_id: 3
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide complete bid information")
    })

    it("POST /items/:item_id/bids, no info provided", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .post("/items/3/bids")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide complete bid information")
    })

    it("DELETE /items/:item_id/bids/:id, deletes specific bid", async () => {
        // make get request to /bids
        const res = await supertest(server).del("/items/3/bids/11")

        // make assertions
        // correct status code?
        expect(res.statusCode).toBe(204)
    })

    it("DELETE /items/:item_id/bids/:id, invalid bid id", async () => {
        // make get request to /bids
        const res = await supertest(server).del("/items/3/bids/201")

        // make assertions
        // correct status code?
        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBe("Bid not found")
    })

    it("DELETE /items/:item_id/bids/:id, invalid item_id", async () => {
        // make get request to /bids
        const res = await supertest(server).del("/items/93/bids/1")

        // make assertions
        // correct status code?
        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBe("Item not found")
    })

    it("PUT /items/:item_id/bids/:id, updates specific bid", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .put("/items/3/bids/11")
            .send({
                buyer_user_id: 1,
                item_id: 3,
                amount: 1000.00
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.amount).toBe(1000.00)
    })

    it("PUT /items/:item_id/bids/:id, invalid bid id", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .put("/items/3/bids/1009")
            .send({
                buyer_user_id: 1,
                item_id: 3,
                amount: 1000.00
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Bid not found")
    })

    it("PUT /items/:item_id/bids/:id, invalid item_id", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .put("/items/17/bids/11")
            .send({
                buyer_user_id: 1,
                item_id: 3,
                amount: 1000.00
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Item not found")
    })

    it("PUT /items/:item_id/bids/:id, no buyer_user_id provided", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .put("/items/3/bids/11")
            .send({
                item_id: 3,
                amount: 1000.00
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide complete bid information")
    })

    it("PUT /items/:item_id/bids/:id, no item_id provided", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .put("/items/3/bids/11")
            .send({
                buyer_user_id: 1,
                amount: 1000.00
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide complete bid information")
    })

    it("PUT /items/:item_id/bids/:id, no amount provided", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .put("/items/3/bids/11")
            .send({
                buyer_user_id: 1,
                item_id: 3
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide complete bid information")
    })

    it("PUT /items/:item_id/bids/:id, no info provided", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .put("/items/3/bids/11")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Please provide complete bid information")
    })
})
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

describe("auctions integration tests", () => {
    it("GET /auctions", async () => {
        // make get request to /bids
        const res = await supertest(server).get("/auctions")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body).toHaveLength(1)
        expect(res.body[0].name).toBe("First Charity Auction")
    })

    it("GET /auctions/:id", async () => {
        // make get request to /bids
        const res = await supertest(server).get("/auctions/1")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("First Charity Auction")
    })

    it("GET /auctions/:id, invalid id", async () => {
        // make get request to /bids
        const res = await supertest(server).get("/auctions/13")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Auction not found")
    })

    // it("POST /users/login, set up for following tests", async () => {
    //     // make get request to /bids
    //     const res = await supertest(server)
    //         .post("/users/login")
    //         .send({
    //             username: "seller1",
    //             password: "abc123"
    //         })

    //     // make assertions
    //     // correct status code?
    //     // correct data type?
    //     // correct data?
    //     console.log("body", res.body)
    //     //console.log("res", res)
    //     expect(res.statusCode).toBe(200)
    //     expect(res.type).toBe("application/json")
    // })

    it("POST /auctions", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .post("/auctions")
            .set("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX3JvbGUiOjIsImlhdCI6MTYwMTA1NTk3Nn0.o5IX0760I2cDX1MPUKvJda549L7s7TP817BnyDklI2o")
            .send({
                user_id: 2,
                name: "Super Auction",
                exp_date: "10-07-2020"
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("Super Auction")
        console.log("auction res.body", res.body)
        // console.log("auction res", res)
    })

    it("DELETE /auctions/:id", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .del("/auctions/1")
            .set("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX3JvbGUiOjIsImlhdCI6MTYwMTA1NTk3Nn0.o5IX0760I2cDX1MPUKvJda549L7s7TP817BnyDklI2o")

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(204)
    })

    it("PUT /auctions/:id", async () => {
        // make get request to /bids
        const res = await supertest(server)
            .post("/auctions/1")
            .set("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX3JvbGUiOjIsImlhdCI6MTYwMTA1NTk3Nn0.o5IX0760I2cDX1MPUKvJda549L7s7TP817BnyDklI2o")
            .send({
                user_id: 2,
                name: "Super Charity Auction",
                exp_date: "10-07-2020"
            })

        // make assertions
        // correct status code?
        // correct data type?
        // correct data?
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        console.log(res.body)
    })
})

const db = require("../data/dbConfig")
const server = require("../server")
const supertest = require("supertest")

beforeEach(async () => {
	// run the seeds programatically before each test to start fresh
	await db.seed.run()
})

afterAll(async () => {
	// close the database connection so the test process doesn't hang or give a warning
	await db.destroy()
})

describe("users integration tests", () => {
    it("GET /", async () => {
        const res = await supertest(server).get('/users')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBe(3)
        expect(res.body[0].username).toBe("buyer1")
    })
})
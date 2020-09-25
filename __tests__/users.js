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
    it("Register a new user", async () => {
        const res = await supertest(server)
            .post('/users/register')
            .send({role_id: 2, username: "test", password: "abc123"})
        expect(res.statusCode).toBe(201)
        expect(res.body.username).toBe("test")
        expect(res.body.role_id).toBe(2)
        expect(res.req.method).toBe('POST')
    })
    it("Log in with new user", async () => {
        const user = "buyer1"
        const res = await supertest(server)
            .post('/users/login')
            .send({username: user, password: "abc123"})
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe(`Welcome ${user}!`)
        expect(res.body.Role).toBe(1)
        expect(res.req.method).toBe('POST')
    })
})

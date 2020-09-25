const db = require("../data/dbConfig")
const server = require("../server")
const supertest = require("supertest")

beforeEach(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy()
})

const token = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VyX3JvbGUiOjIsImlhdCI6MTYwMTA3MjQ3MH0.0LSb-Th54X6yMU8LQVjbJ1zuWUIaitOhMrhO_MH9E6c"

describe("items integration tests", () => {
    it("GET all items", async () => {
        const res = await supertest(server).get('/items/')
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(3)
        expect(res.body[0].id).toBe(1)
        expect(res.body[1].SellerName).toBe("seller1")
        expect(res.body[2].price).toBe(750)
    })
    it("GET item by id", async () => {
        const res = await supertest(server).get('/items/1')
        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(1)
        expect(res.body.name).toBe("grandma's rocking chair")
        expect(res.body.price).toBe(250)
    })
    it("GET items from seller", async () => {
        const res = await supertest(server).get('/items/seller/2')
        expect(res.statusCode).toBe(200)
        expect(res.body[0].image).toBe("https://unsplash.com/photos/LzKc4LNqDGM")
        expect(res.body[1].description).toBe("A rusty old spoon")
        expect(res.body[2].price).toBe(750)
    })
    it("GET items from auction", async () => {
        const res = await supertest(server).get('/items/auction/1')
        expect(res.statusCode).toBe(200)
        expect(res.body[0].name).toBe("grandma's rocking chair")
        expect(res.body[1].description).toBe("A rusty old spoon")
        expect(res.body[2].price).toBe(750)
    })
    it("Buyer trying to add a new item", async () => {
        const res = await supertest(server)
            .post('/items/')
            .send({name: "test item", image: "rocker.com", description: "test", price: 123.24, seller_user_id: 2})
        expect(res.statusCode).toBe(401)
        expect(res.body.message).toBe("You are not permitted to enter")
    })
    it("Seller trying to add a new item", async () => {
        const res = await supertest(server)
            .post('/items/')
            .set("Cookie", token)
            .send({name: "test item", image: "rocker.com", description: "test", price: 123.24, seller_user_id: 2, auction_id: 1})
        expect(res.statusCode).toBe(201)
        expect(res.body.name).toBe("test item")
        expect(res.body.price).toBe(123.24)
    })
    it("Seller editing item", async () => {
        const res = await supertest(server)
            .put('/items/1')
            .set("Cookie", token)
            .send({name: "tea cup set", price: 25.75})
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe("tea cup set")
        expect(res.body.price).toBe(25.75)
    })
    it("Seller deleting item not found", async () => {
        const res = await supertest(server)
            .delete('/items/10')
            .set("Cookie", token)
        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBe("Item not found")
    })
    it("Seller deleting item", async () => {
        const res = await supertest(server)
            .delete('/items/1')
            .set("Cookie", token)
        expect(res.statusCode).toBe(204)
    })
})
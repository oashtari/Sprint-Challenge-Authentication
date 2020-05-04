const server = require('../api/server')

const request = require('supertest');

const db = require('../database/dbConfig')


describe("GET /api/jokes", () => {
    it("should return 400 without token in header", () => {
        return request(server)
            .get("/api/jokes")
            .then((res) => {
                expect(res.status).toBe(400);
            });
    });


    it("should return the correct id of the first joke", async function () {
        const newUser = { username: "gunner", password: "dogAgain" };
        const { username, password } = newUser;

        beforeEach(async () => {
            await db("users").insert(newUser); // Add user
        });

        const loggedIn = await request(server)
            .post("/api/auth/login")
            .send({ username, password });

        const { token } = loggedIn.body; // Grab token from login

        return request(server)
            .get("/api/jokes")
            .set("Authorization", token)
            .then((res) => {
                expect(res.body[0].id).toBe("0189hNRf2g");
            });
    });

});
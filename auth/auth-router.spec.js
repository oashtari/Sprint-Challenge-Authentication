const server = require('../api/server')

const request = require('supertest');

const db = require('../database/dbConfig')


describe("POST /register", () => {
    const newUser = { username: "gunner", password: "dogAgain" };
    const { username } = newUser;

    beforeEach(async () => {
        await db('users').truncate(); // Empty rows, reset ID back to 1
    });

    it("should return 200 after registering", async () => {
        await request(server)
            .post("/api/auth/register")
            .send(newUser)
            .then((res) => {
                expect(res.status).toBe(200);
            });
    });

    it("should return user object after registering", async () => {
        await request(server)
            .post("/api/auth/register")
            .send(newUser)
            .then((res) => {
                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("username");
                expect(res.body).toHaveProperty("password");
            });
    });

    it("should find user in DB after registration", async () => {
        await request(server)
            .post("/api/auth/register")
            .send(newUser)
            .then(async (res) => {
                const addedUser = await db("users").where({ username }).first();
                expect(addedUser).toHaveProperty("id");
                expect(addedUser).toHaveProperty("username");
                expect(addedUser).toHaveProperty("password");
            });
    });
});

describe("POST /login", () => {
    const newUser = { username: "gunner", password: "dogAgain" };

    it("should return 200", async () => {
        await request(server)
            .post("/api/auth/login")
            .send(newUser)
            .then((res) => {
                expect(res.status).toBe(200);
            })
            .catch((err) => console.log(err));
    });

    it("should return 401 with bad credentials", async () => {
        await request(server)
            .post("/api/auth/login")
            .send({ username: "asd" })
            .then((res) => {
                expect(res.status).toBe(401);
            })
            .catch((err) => console.log(err));
    });

    it("should return object with token", async () => {
        await request(server)
            .post("/api/auth/login")
            .send(newUser)
            .then((res) => {
                expect(res.body.message.includes("Welcome ")).toBe(true);
                expect(res.body).toHaveProperty("token");
            })
            .catch((err) => console.log(err));
    });
});


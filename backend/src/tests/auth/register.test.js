
const request = require("supertest");

const app = require("../../../app");

describe("Register API", () => {

    test("should register a new user", async () => {

        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Dhruv",
                email: "dhruv@gmail.com",
                password: "Password123"
            });

        expect(response.statusCode).toBe(201);

    });

});
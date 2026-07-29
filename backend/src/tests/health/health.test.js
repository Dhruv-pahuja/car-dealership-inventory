
const request = require("supertest");

const app = require("../../../app");

describe("Health Check API", () => {

    test("GET /health should return status 200", async () => {

        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);

    });

    test("GET /health should return success true", async () => {

        const response = await request(app).get("/health");

        expect(response.body.success).toBe(true);

    });

    test("GET /health should return correct message", async () => {

        const response = await request(app).get("/health");

        expect(response.body.message).toBe("Server is running");

    });

});
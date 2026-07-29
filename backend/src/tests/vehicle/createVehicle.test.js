const request = require("supertest");

const app = require("../../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");

describe("Create Vehicle API", () => {

    beforeEach(async () => {
        await User.deleteMany({});
        await Vehicle.deleteMany({});
    });

    test("should create a vehicle", async () => {

        // Register

        const register = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "admin@gmail.com",
                password: "Password123",
            });

        const token = register.body.token;

        const response = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4200000,
                quantity: 5,
            });

        expect(response.statusCode).toBe(201);

    });

});
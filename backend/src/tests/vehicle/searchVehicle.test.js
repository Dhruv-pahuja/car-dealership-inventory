const request = require("supertest");

const app = require("../../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");

describe("Search Vehicles API", () => {

    beforeEach(async () => {
        await User.deleteMany({});
        await Vehicle.deleteMany({});
    });

    test("should search vehicles by make", async () => {

        const register = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Dhruv",
                email: "dhruv@gmail.com",
                password: "Password123",
            });

        const token = register.body.token;

        await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4200000,
                quantity: 5,
            });

        await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Honda",
                model: "City",
                category: "Sedan",
                price: 1800000,
                quantity: 3,
            });

        const response = await request(app)
            .get("/api/vehicles/search?make=Toyota")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.vehicles.length).toBe(1);
        expect(response.body.vehicles[0].make).toBe("Toyota");

    });

});
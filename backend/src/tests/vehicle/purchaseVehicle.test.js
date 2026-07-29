const request = require("supertest");

const app = require("../../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");

describe("Purchase Vehicle API", () => {

    beforeEach(async () => {
        await User.deleteMany({});
        await Vehicle.deleteMany({});
    });

    test("should decrease vehicle quantity after purchase", async () => {

        const register = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Dhruv",
                email: "dhruv@gmail.com",
                password: "Password123",
            });

        const token = register.body.token;

        const createdVehicle = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4200000,
                quantity: 5,
            });

        const response = await request(app)
            .post(`/api/vehicles/${createdVehicle.body.vehicle._id}/purchase`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.vehicle.quantity).toBe(4);

    });

});
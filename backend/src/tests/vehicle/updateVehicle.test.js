const request = require("supertest");

const app = require("../../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");

describe("Update Vehicle API", () => {

    beforeEach(async () => {
        await User.deleteMany({});
        await Vehicle.deleteMany({});
    });

    test("should update vehicle details", async () => {

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
            .put(`/api/vehicles/${createdVehicle.body.vehicle._id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                price: 4500000,
                quantity: 8,
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.vehicle.price).toBe(4500000);

        expect(response.body.vehicle.quantity).toBe(8);

    });

});
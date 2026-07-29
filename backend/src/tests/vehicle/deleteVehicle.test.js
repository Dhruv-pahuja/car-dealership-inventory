const request = require("supertest");

const app = require("../../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");

describe("Delete Vehicle API", () => {

    beforeEach(async () => {
        await User.deleteMany({});
        await Vehicle.deleteMany({});
    });

    test("should delete a vehicle", async () => {

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "admin@gmail.com",
                password: "Password123",
            });

        await User.findOneAndUpdate(
            { email: "admin@gmail.com" },
            { role: "admin" }
        );

        const login = await request(app)
            .post("/api/auth/login")
            .send({
                email: "admin@gmail.com",
                password: "Password123",
            });

        const token = login.body.token;

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
            .delete(`/api/vehicles/${createdVehicle.body.vehicle._id}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.message)
            .toBe("Vehicle deleted successfully");

    });

});
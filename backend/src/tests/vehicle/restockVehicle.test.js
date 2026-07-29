const request = require("supertest");

const app = require("../../../app");
const User = require("../../models/User");
const Vehicle = require("../../models/Vehicle");
const makeAdmin = require("../helpers/createAdmin");

describe("Restock Vehicle API", () => {

    beforeEach(async () => {
        await User.deleteMany({});
        await Vehicle.deleteMany({});
    });

    test("should increase vehicle quantity", async () => {

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "admin@gmail.com",
                password: "Password123"
            });

        await makeAdmin("admin@gmail.com");

        const login = await request(app)
            .post("/api/auth/login")
            .send({
                email: "admin@gmail.com",
                password: "Password123"
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
                quantity: 5
            });

        const response = await request(app)
            .post(`/api/vehicles/${createdVehicle.body.vehicle._id}/restock`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                quantity: 3
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.vehicle.quantity).toBe(8);

    });

});
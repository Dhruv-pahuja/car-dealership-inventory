const request = require("supertest");

const app = require("../../../app");
const User = require("../../models/User");

describe("Login API", () => {

    beforeEach(async () => {
        await User.deleteMany({});
    });

    test("should login successfully with valid credentials", async () => {

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Dhruv",
                email: "dhruv@gmail.com",
                password: "Password123"
            });

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "dhruv@gmail.com",
                password: "Password123"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.token).toBeDefined();

        expect(response.body.user.email).toBe("dhruv@gmail.com");

    });

});
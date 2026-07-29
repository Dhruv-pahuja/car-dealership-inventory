const request = require("supertest");

const app = require("../../../app");

describe("Register API", () => {
  test("should register a new user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Dhruv",
      email: "dhruv@gmail.com",
      password: "Password123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("User registered successfully");

    expect(response.body.token).toBeDefined();

    expect(response.body.user).toBeDefined();

    expect(response.body.user.name).toBe("Dhruv");

    expect(response.body.user.email).toBe("dhruv@gmail.com");

    expect(response.body.user.role).toBe("user");

    expect(response.body.user.password).toBeUndefined();

  });

  
});

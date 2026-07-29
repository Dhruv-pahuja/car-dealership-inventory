require("dotenv").config();
jest.setTimeout(15000);
const mongoose = require("mongoose");
const connectDB = require("../config/db");

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await connectDB();
    }
}, 15000);

afterAll(async () => {
    await mongoose.connection.close();
});
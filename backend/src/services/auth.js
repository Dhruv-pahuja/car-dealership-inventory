const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const createError = require("../utils/errors");

const registerUser = async ({ name, email, password }) => {

   const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw createError("Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
        throw createError("Email already exists", 409);
    }

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user);

    return {
        user,
        token,
    };

};

const loginUser = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw createError("Invalid email or password", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw createError("Invalid email or password", 401);
    }

    const token = generateToken(user);

    return {
        user,
        token,
    };

};

module.exports = {
    registerUser,
    loginUser,
};
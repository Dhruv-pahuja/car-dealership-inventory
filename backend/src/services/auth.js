const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password }) => {

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    return {
        user,
        token,
    };

};

module.exports = {
    registerUser,
};
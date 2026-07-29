const { registerUser } = require("../services/auth.js");

const register = async (req, res) => {

    try {

        const { user, token } = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
}

};

module.exports = {
    register,
};
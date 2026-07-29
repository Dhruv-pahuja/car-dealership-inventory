const { registerUser, loginUser } = require("../services/auth");

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
        if (!error.statusCode) {
            console.error(error);
        }
        return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
    });
}

};

const login = async (req, res) => {

    try {

        const { user, token } = await loginUser(req.body);

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        if (!error.statusCode) {
            console.error(error);
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    register,
    login,
};
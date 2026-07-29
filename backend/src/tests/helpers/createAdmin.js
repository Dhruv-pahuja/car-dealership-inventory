const User = require("../../models/User");

const makeAdmin = async (email) => {
    return await User.findOneAndUpdate(
        { email },
        { role: "admin" },
        { new: true }
    );
};

module.exports = makeAdmin;
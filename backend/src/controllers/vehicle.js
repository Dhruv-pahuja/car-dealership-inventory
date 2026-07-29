const { createVehicle } = require("../services/vehicle");

const addVehicle = async (req, res) => {

    try {

        const vehicle = await createVehicle(req.body);

        return res.status(201).json({
            success: true,
            message: "Vehicle added successfully",
            vehicle,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    addVehicle,
};
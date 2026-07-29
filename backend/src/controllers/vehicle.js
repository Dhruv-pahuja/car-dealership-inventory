const { createVehicle,getVehicles,searchVehicles } = require("../services/vehicle");

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

const getAllVehicles = async (req, res) => {

    try {

        const vehicles = await getVehicles();

        return res.status(200).json({
            success: true,
            vehicles,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const searchVehicle = async (req, res) => {

    try {

        const vehicles = await searchVehicles(req.query);

        return res.status(200).json({
            success: true,
            vehicles,
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
    getAllVehicles,
    searchVehicle,
};
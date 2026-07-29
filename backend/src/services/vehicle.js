const Vehicle = require("../models/Vehicle");

const createVehicle = async (vehicleData) => {

    const vehicle = await Vehicle.create(vehicleData);

    return vehicle;

};

module.exports = {
    createVehicle,
};
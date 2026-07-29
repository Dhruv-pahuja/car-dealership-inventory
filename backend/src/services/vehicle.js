const Vehicle = require("../models/Vehicle");

const createVehicle = async (vehicleData) => {

    const vehicle = await Vehicle.create(vehicleData);

    return vehicle;

};

const getVehicles = async () => {

    return await Vehicle.find();

};

module.exports = {
    createVehicle,
    getVehicles,
};
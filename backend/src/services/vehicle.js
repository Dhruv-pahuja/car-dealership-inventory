const Vehicle = require("../models/Vehicle");
const createVehicle = async (vehicleData) => {

    const vehicle = await Vehicle.create(vehicleData);

    return vehicle;

};

const getVehicles = async () => {

    return await Vehicle.find();

};

const searchVehicles = async (query) => {

    const filter = {};

    if (query.make) {
        filter.make = new RegExp(query.make, "i");
    }

    if (query.model) {
        filter.model = new RegExp(query.model, "i");
    }

    if (query.category) {
        filter.category = new RegExp(query.category, "i");
    }

    if (query.minPrice || query.maxPrice) {

        filter.price = {};

        if (query.minPrice) {
            filter.price.$gte = Number(query.minPrice);
        }

        if (query.maxPrice) {
            filter.price.$lte = Number(query.maxPrice);
        }
    }

    return await Vehicle.find(filter);

};

module.exports = {
    createVehicle,
    getVehicles,
    searchVehicles,
};
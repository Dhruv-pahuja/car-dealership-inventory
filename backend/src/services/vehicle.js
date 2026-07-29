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

const purchaseVehicle = async (id) => {

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
        const error = new Error("Vehicle not found");
        error.statusCode = 404;
        throw error;
    }

    if (vehicle.quantity <= 0) {
        const error = new Error("Vehicle out of stock");
        error.statusCode = 400;
        throw error;
    }

    vehicle.quantity -= 1;

    await vehicle.save();

    return vehicle;

};

module.exports = {
    createVehicle,
    getVehicles,
    searchVehicles,
    purchaseVehicle,
};

const Vehicle = require("../models/Vehicle");
const createError = require("../utils/errors");


const createVehicle = async (vehicleData) => {

    const vehicle = await Vehicle.create(vehicleData);

    return vehicle;

};

const getVehicles = async () => {

    return Vehicle.find();

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

    return Vehicle.find(filter);

};

const purchaseVehicle = async (id) => {

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }

    if (vehicle.quantity <= 0) {
        throw createError("Vehicle out of stock", 400);
    }

    vehicle.quantity -= 1;

    await vehicle.save();

    return vehicle;

};

const restockVehicle = async (id, quantity) => {

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
       throw createError("Vehicle not found", 404);
    }

    vehicle.quantity += quantity;

    await vehicle.save();

    return vehicle;

};

const updateVehicle = async (id, updateData) => {

    const vehicle = await Vehicle.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }

    return vehicle;

};

const deleteVehicle = async (id) => {

    const vehicle = await Vehicle.findByIdAndDelete(id);

    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }

    return vehicle;

};

module.exports = {
    createVehicle,
    getVehicles,
    searchVehicles,
    purchaseVehicle,
    restockVehicle,
    updateVehicle,
    deleteVehicle,
};
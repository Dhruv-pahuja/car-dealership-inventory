const {
  createVehicle,
  getVehicles,
  searchVehicles,
  purchaseVehicle,
  restockVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../services/vehicle");

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

const purchase = async (req, res) => {
  try {
    const vehicle = await purchaseVehicle(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vehicle purchased successfully",
      vehicle,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const restock = async (req, res) => {
  try {
    const vehicle = await restockVehicle(
      req.params.id,
      Number(req.body.quantity),
    );

    return res.status(200).json({
      success: true,
      message: "Vehicle restocked successfully",
      vehicle,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const vehicle = await updateVehicle(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeVehicle = async (req, res) => {

    try {

        await deleteVehicle(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
        });

    } catch (error) {

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
  addVehicle,
  getAllVehicles,
  searchVehicle,
  purchase,
  restock,
  update,
  removeVehicle,
};

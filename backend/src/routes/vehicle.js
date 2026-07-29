const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth");

const { addVehicle, getAllVehicles,searchVehicle } = require("../controllers/vehicle");

router.post("/", authenticate, addVehicle);
router.get("/",authenticate,getAllVehicles);
router.get("/search",authenticate,searchVehicle);

module.exports = router;
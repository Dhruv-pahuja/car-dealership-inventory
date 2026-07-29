const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth");

const { addVehicle } = require("../controllers/vehicle");

router.post("/", authenticate, addVehicle);

module.exports = router;
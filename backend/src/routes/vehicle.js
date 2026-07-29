const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth");

const { addVehicle, getAllVehicles } = require("../controllers/vehicle");

router.post("/", authenticate, addVehicle);
router.get("/",authenticate,getAllVehicles);

module.exports = router;
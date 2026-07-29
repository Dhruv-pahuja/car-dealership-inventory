const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth");

const { addVehicle, getAllVehicles,searchVehicle,purchase } = require("../controllers/vehicle");

router.post("/", authenticate, addVehicle);
router.get("/",authenticate,getAllVehicles);
router.get("/search",authenticate,searchVehicle);
router.post("/:id/purchase",authenticate,purchase);

module.exports = router;
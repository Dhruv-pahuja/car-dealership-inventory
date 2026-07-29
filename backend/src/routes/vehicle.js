const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

const {
  addVehicle,
  getAllVehicles,
  searchVehicle,
  purchase,
  restock,
} = require("../controllers/vehicle");

router.post("/", authenticate, addVehicle);
router.get("/", authenticate, getAllVehicles);
router.get("/search", authenticate, searchVehicle);
router.post("/:id/purchase", authenticate, purchase);
router.post("/:id/restock", authenticate, isAdmin, restock);

module.exports = router;

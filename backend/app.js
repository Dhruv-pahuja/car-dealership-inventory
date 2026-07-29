const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const authRoutes = require("./src/routes/auth.js");

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

app.use("/api/auth", authRoutes);

module.exports = app;
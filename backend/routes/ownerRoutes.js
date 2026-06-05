const express = require("express");
const router = express.Router();

const owner = require("../middleware/owner");

const {
    dashboard,
    changePassword
} = require("../controllers/ownerController");

router.get("/dashboard", owner, dashboard);

router.put(
    "/change-password",
    owner,
    changePassword
);

module.exports = router;
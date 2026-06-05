const express = require("express");
const router = express.Router();

const admin = require("../middleware/admin");

const {
    dashboard,
    addUser,
    addStore,
    getUsers,
    getStores,
    getUserDetails
} = require("../controllers/adminController");

router.get("/dashboard", admin, dashboard);

router.post("/add-user", admin, addUser);

router.post("/add-store", admin, addStore);

router.get("/users", admin, getUsers);

router.get("/stores", admin, getStores);

router.get("/user/:id", admin, getUserDetails);

module.exports = router;
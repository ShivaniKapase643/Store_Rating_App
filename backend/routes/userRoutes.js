const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    getStores,
    addRating,
    updateRating,
    changePassword
} = require("../controllers/userController");

router.get("/stores", auth, getStores);

router.post("/rating", auth, addRating);

router.put("/rating/:storeId", auth, updateRating);

router.put("/change-password", auth, changePassword);

module.exports = router;
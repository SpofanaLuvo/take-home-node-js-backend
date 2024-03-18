const express = require("express");
const router = express.Router();
const {
    makePayment,
    rateCleaner,
} = require("../controllers/employerController");

const { protect } = require("../middleware/authMiddleware");
router.post("/payment", makePayment);
router.post("/ratings", rateCleaner);

module.exports = router;

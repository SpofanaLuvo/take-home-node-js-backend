const express = require("express");
const router = express.Router();
const {
    getAvailableCleaners,
    makePayment,
    rateCleaner,
    viewAllRatings,
    viewCleanerRatings,
} = require("../controllers/customerController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getAvailableCleaners);
router.post("/payment/:id", makePayment);
router.route("/ratings").get(viewAllRatings).post(rateCleaner);
router.get("/ratings/:id", viewCleanerRatings);

module.exports = router;
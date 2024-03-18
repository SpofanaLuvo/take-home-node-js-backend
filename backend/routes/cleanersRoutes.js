const express = require("express");
const router = express.Router();
const {
    getAvailableCleaners,
    getPendingTasks,
    getCompletedTasks,
    getTotals,
    viewAllRatings,
    viewCleanerRatings,
} = require("../controllers/cleanersController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getAvailableCleaners);
router.get("/tasks/pending", protect, getPendingTasks);
router.get("/tasks/completed", protect, getCompletedTasks);
router.route("/ratings").get(viewAllRatings);
router.route("/ratings/:id").get(viewCleanerRatings);
router.get("/totals", protect, getTotals);

module.exports = router;

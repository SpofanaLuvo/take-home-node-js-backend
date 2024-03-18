const asyncHandler = require("express-async-handler");
const { insertInto, selectFrom } = require("../helpers/helperData");
const pool = require("../config/dbConnection");

//@desc = Get Available cleaners
//@route = GET /api/cleaners
//@access = Public
const getAvailableCleaners = asyncHandler(async (req, res) => {
    try {
        cleaners = await pool.query(selectFrom.cleaners);
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(cleaners.rows);
});

//@desc = Get pending tasks
//@route = GET /api/tasks/pending
//@access = Private
const getPendingTasks = asyncHandler(async (req, res) => {
    try {
        tasks = await pool.query(selectFrom.tasks);
        pendingTasks = tasks.filter((task) => task.status === "pending");
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(pendingTasks.rows);
});

//@desc = Get completed tasks
//@route = GET /api/tasks/completed
//@access = Private
const getCompletedTasks = asyncHandler(async (req, res) => {
    try {
        tasks = await pool.query(selectFrom.tasks);
        completedTasks = tasks.filter((task) => task.status === "completed");
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(completedTasks.rows);
});

//@desc = Get total Income
//@route = GET /api/totals/
//@access = Private
const getTotals = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        res.status(400);
        throw new Error("Please add all  fields");
    }

    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field");
    }

    const { cleaner_id, date, aggregationType } = req.body;
    let query;

    if (aggregationType === "month") {
        query = selectFrom.paymentsForDay(cleaner_id, date);
    } else {
        query = selectFrom.paymentsForMonth(cleaner_id, date);
    }

    try {
        const totalIncome = await pool.query(query);
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(totalIncome);
});

//@desc View Ratings
//@route = GET /api/ratings/
//@access = Public
const viewAllRatings = asyncHandler(async (req, res) => {
    try {
        ratings = await pool.query(selectFrom.ratings);
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(ratings.rows);
});

const viewCleanerRatings = asyncHandler(async (req, res) => {
    try {
        ratings = await pool.query(selectFrom.ratingWithId(req.params.id));
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(ratings.rows);
});

module.exports = {
    getAvailableCleaners,
    getPendingTasks,
    getCompletedTasks,
    getTotals,
    viewAllRatings,
    viewCleanerRatings,
};

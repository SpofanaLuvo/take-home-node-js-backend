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

//@desc Make payment
//@route = POST /api/payment/:id
//@access = Public
const makePayment = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field");
    }

    const user = await pool.query(selectFrom.userWithId(request.params.id));
    if (!user) {
        throw new Error("User does not exist");
    }

    const { cleaner_id, amount, payment_date } = req.body;

    try {
        await pool.query(insertInto.payments(cleaner_id, amount, payment_date));
    } catch (error) {
        console.log(error);
    }

    res.json({ message: `Payment made to cleaner ${cleaner_id}` });
});

//@desc Rate a cleaner
//@route = POST /api/ratings/
//@access = Public
const rateCleaner = asyncHandler(async (req, res) => {
    const { cleaner_id, rating } = req.body;

    try {
        await pool.query(insertInto.ratings(cleaner_id, rating));
    } catch (error) {
        console.log(error);
    }

    res.json({ message: `Rating made to cleaner ${cleaner_id}` });
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
    makePayment,
    rateCleaner,
    viewAllRatings,
    viewCleanerRatings
};

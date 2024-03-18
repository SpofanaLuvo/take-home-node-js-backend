const express = require("express");
const pool = require("./config/dbConnection");
const port = 3000;
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/cleaners", require("./routes/cleanersRoutes"));
app.use("/api/employer", require("./routes/employerRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

// app.post("/", async (req, res) => {
//     const { name, location } = req.body;
//     try {
//         await pool.query(
//             "INSERT INTO schools (name, address) VALUES ($1, $2)",
//             [name, location]
//         );
//         res.status(200).send({ message: "Successfully added child" });
//     } catch (err) {
//         console.log(err);
//         res.sendStatus(500);
//     }
// });

app.listen(port, () => console.log(`Server has started on port: ${port}`));

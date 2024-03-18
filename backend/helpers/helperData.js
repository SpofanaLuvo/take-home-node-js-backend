const { Pool } = require("pg");

var pool = new Pool({
    user: "postgres",
    host: "db",
    password: "root",
});

async function populateTables() {
    try {
        for (const table of Object.values(insertInto)) {
            await pool.query(table);
        }
    } catch (error) {
        console.log(error);
    }
}

async function createTables() {
    try {
        for (const table of Object.values(createTableScripts)) {
            await pool.query(table);
        }
    } catch (error) {
        console.log(error);
    }
}


const insertInto = {
    users: (name, email, password, role) => {
        return `INSERT INTO users (name, email, password, role) VALUES ('${name}','${email}', '${password}', '${role}')`;
    },
    cleaners: (email, password, role) => {
        return `INSERT INTO users (email, password, role) VALUES ('${email}', '${password}', '${role}) `;
    },
    tasks: "INSERT INTO tasks (description, hourly_rate, status) VALUES ('Task 1', 100, 'pending'), ('Task 2', 150, 'pending'), ('Task 3', 50, 'completed'), ('Task 4', 300, 'pending'), ('Task 5', 250, 'completed');",
    ratings: (cleaner_id, rating) => {
        return `INSERT INTO ratings (cleaner_id, rating) VALUES ('${cleaner_id}', '${rating}');`;
    },
    payments: (cleaner_id,task_id, amount, payment_date) => {
        `INSERT INTO Payments (cleaner_id,task_id, amount, payment_date) VALUES ('${cleaner_id}','${task_id}','${amount}','${payment_date}');`;
    },
};

const selectFrom = {
    userWithEmail: (email) => {
        return `SELECT * FROM users WHERE email ='${email}';`;
    },
    userWithId: (user_id) => {
        return `SELECT * FROM users WHERE user_id ='${user_id}';`;
    },
    users: "SELECT * FROM users;",
    cleaners: "SELECT * FROM cleaners;",
    cleanerWithId: (cleaner_id) => {
        return `SELECT * FROM users WHERE user_id ='${cleaner_id}';`;
    },
    tasks: "SELECT * FROM tasks;",
    ratingWithId: (cleaner_id) => {
        return `SELECT * FROM ratings WHERE cleaner_id='${cleaner_id}';`;
    },
    ratings: "SELECT * FROM ratings;",
    paymentsForDay: (cleaner_id, day) => {
        return `SELECT SUM(PaymentAmount) AS total_amount
                FROM Payments
                WHERE CleanerID = ${cleaner_id} AND DATE_TRUNC('day', Timestamp) = '${day}';`;
    },
    paymentsForMonth: (cleaner_id, month) => {
        return `SELECT SUM(amount) AS total_amount
                FROM payments
                WHERE cleaner_id = ${cleaner_id} AND DATE_TRUNC('month', Timestamp) = '${month}';`;
    },
    payments: "SELECT * FROM payments;",
};

module.exports = { createTables, populateTables, insertInto, selectFrom };

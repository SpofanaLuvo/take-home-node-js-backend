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

const createTableScripts = {
    users: "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, role ENUM('customer','cleaner') NOT NULL)",
    cleaners:
        "CREATE TABLE IF NOT EXISTS cleaners (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, FOREIGN KEY (id) REFERENCES Users(id));",
    tasks: "CREATE TABLE IF NOT EXISTS Tasks (id SERIAL PRIMARY KEY AUTO_INCREMENT,description TEXT NOT NULL, hourly_rate DECIMAL(10, 2) NOT NULL, status ENUM('pending', 'completed') NOT NULL, FOREIGN KEY (assigned_to) REFERENCES Cleaners(id));",
    ratings:
        "CREATE TABLE IF NOT EXISTS ratings (id SERIAL PRIMARY KEY AUTO_INCREMENT,cleaner_id INT, rating INT NOT NULL, FOREIGN KEY (cleaner_id) REFERENCES Cleaners(id));",
    payments:
        "CREATE TABLE IF NOT EXISTS payments (id SERIAL PRIMARY KEY AUTO_INCREMENT,task_id INT, amount DECIMAL(10, 2) NOT NULL, payment_date DATE NOT NULL, FOREIGN KEY (task_id) REFERENCES Tasks(id));",
};

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
    payments: (task_id, amount, payment_date) => {
        `INSERT INTO Payments (task_id, amount, payment_date) VALUES ('${cleaner_id}','${amount}','${payment_date}');`;
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

import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: './.env' })

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
})

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySql Connected!")
    }
})

export default db;
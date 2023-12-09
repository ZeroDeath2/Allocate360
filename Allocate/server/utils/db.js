import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: './.env' })

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cas',
})

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MySql Connected!")
    }
})

export default db;
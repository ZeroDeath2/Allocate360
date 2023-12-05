import { adminRouter } from './Routes/AdminRoute.js';
import { teacherRouter } from './Routes/TeacherRoute.js';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: './.env' })

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/auth', adminRouter);
app.use('/authT', teacherRouter);

app.listen(3001, () => {
    console.log("running server");
})
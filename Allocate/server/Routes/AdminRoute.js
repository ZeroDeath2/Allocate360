import express from "express";
import db from '../utils/db.js';
import path from "path";
import jwt from 'jsonwebtoken';

const router = express.Router();
router.post("/login", (req, res) => {
    const sql = "Select * from users Where username = ? and password = ?";
    db.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query Error" });
        if (result.length > 0) {
            const username = result[0].username;
            const token = jwt.sign({ role: "admin", username: username }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie('token', token)
            return res.json({ loginStatus: true, Role: result[0].user_role, id: result[0].user_id });
        } else {
            return res.json({ loginStatus: false, Error: "Invalid Username/Password" });
        }
    });
})

//seat_no,exam_room_no,exam.exam_id,DATE_FORMAT(exam_date, '%Y-%m-%d') AS exam_date

router.get('/student-profile/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Select student_name,admission_no,Student.class,classroom_no,course from Student Join users On Student.user_id = users.user_id Left Join Exam_detail On Student.student_id = Exam_detail.student_id Where users.user_id =  ?;"
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false });
        return res.json(result);
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

router.get('/teacher_count', (req, res) => {
    const sql = "Select count(teacher.teacher_id) as teacher from teacher";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/student_count', (req, res) => {
    const sql = "Select count(student.student_id) as student from student";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_student', (req, res) => {
    var studentId = 0;
    const sql1 = `INSERT INTO users (username, password, user_role) 
    VALUES (?, ?, 'student')`
    db.query(sql1, [req.body.name, req.body.password], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error 1" })
        const sql2 = `Select user_id from users Where username = ?`;
        db.query(sql2, [req.body.name], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error 2" })
            studentId = result[0].user_id;
            const sql3 = `INSERT INTO student (user_id, student_name,admission_no,class,classroom_no,course) VALUES (?,?,?,?,?,?);`;
            db.query(sql3, [studentId,
                req.body.name,
                req.body.admno,
                req.body.class,
                req.body.classroom_no,
                req.body.course], (err, result) => {
                    if (err) return res.json({ Status: false, Error: "Query Error 3" })
                    return res.json({ Status: true, message: 'Student added success' })
                })
        })
    })
})

router.get('/student', (req, res) => {
    const sql = "Select * from student";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/student/:id', (req,res) => {
    const id = req.params.id;
    const sql = "Select * from student Where student_id = ?";
    db.query(sql,[id],(err,result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_student/:id', (req,res) => {
    const id = req.params.id;
    const sql = `Update student set student_name = ?, admission_no = ?, class = ?, classroom_no = ?, course = ? where student_id = ?`
    db.query(sql,[req.body.name,req.body.admno,req.body.class,req.body.classroom_no,req.body.course,id], (err,result) => {
        if(err) return res.json({Status: false}, {Error:"Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_student/:id', (req,res) => {
    var username;
    const id = req.params.id;
    const sql = "Select student_name from student where student_id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error 1" })
        username = result[0].student_name;
        const sql1 = "Delete from student where student_id = ?"
        db.query(sql1,[id],(err,result) => {
            if(err) return res.json({Status: false, Error: "Query Error 2"})
            const sql2 = "Delete from users where username = ?";
            db.query(sql2,[username],(err,result) => {
                if(err) return res.json({Status: false, Error: "Query Error 3"})
                return res.json({Status: true, Result: result, Message: "Deleted Successfully!"})
            })
        })
    })
})

router.post('/add_teacher', (req,res) => {
    var teacherId=0;
    const sql1 = `Insert into users (username, password, user_role) values(?, ?,'teacher')`
    db.query(sql1,[req.body.name, req.body.password],(err,result)=>{
        if(err)return res.json({Status:false,Error:"Query Error 1"});
        const sql2=`select user_id from users where username='${req.body.name}'`
        db.query(sql2,(err,result)=>{
            if(err)return res.json({Status:false,Error:"Query Error 2"});
            teacherId=result[0].user_id;
            const sql3=`Insert into teacher (user_id, teacher_name, class)values(?,?,?)`
                db.query(sql3,[teacherId,req.body.name,req.body.class],(err,result)=>{
                    if(err)return res.json({Status:false,Error:"Query Error 3"});
                    return res.json({Status:true,message:'Teacher Added Successfully'})
                })
        })
    })
})

router.get('/teacher', (req, res) => {
    const sql = "Select * from teacher";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/teacher/:id', (req,res) => {
    const id = req.params.id;
    const sql = "Select * from teacher Where teacher_id = ?";
    db.query(sql,[id],(err,result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_teacher/:id', (req,res) => {
    const id = req.params.id;
    const sql = `Update teacher set teacher_name = ?, class = ? where teacher_id = ?`
    db.query(sql,[req.body.name,req.body.class,id], (err,result) => {
        if(err) return res.json({Status: false}, {Error:"Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_teacher/:id', (req,res) => {
    var username;
    const id = req.params.id;
    const sql = "Select teacher_name from teacher where teacher_id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error 1" })
        username = result[0].teacher_name;
        const sql1 = "Delete from teacher where teacher_id = ?"
        db.query(sql1,[id],(err,result) => {
            if(err) return res.json({Status: false, Error: "Query Error 2"})
            const sql2 = "Delete from users where username = ?";
            db.query(sql2,[username],(err,result) => {
                if(err) return res.json({Status: false, Error: "Query Error 3"})
                return res.json({Status: true, Result: result, Message: "Deleted Successfully!"})
            })
        })
    })
})

router.get('/exam', (req, res) => {
    const sql = "Select exam_id,exam_name,class,DATE_FORMAT(exam_date, '%Y-%m-%d') AS exam_date,exam_room from exam_detail ";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error"+err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/exam/:id', (req,res) => {
    const id = req.params.id;
    const sql = "Select exam_name,class,DATE_FORMAT(exam_date, '%Y-%m-%d') AS exam_date,exam_room from exam_detail Where exam_id = ?";
    db.query(sql,[id],(err,result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_exam', (req,res) => {
    const sql = `Insert into exam_detail (exam_name,class,exam_date,exam_room) values(?,?,?,?)`
    db.query(sql,[req.body.exam_name,req.body.class,req.body.exam_date,req.body.exam_room],(err,result)=>{
        if(err)return res.json({Status:false,Error:"Query Error"+err});
        return res.json({Status:true,message:'Exam Added Successfully'})
    })
})

router.put('/edit_exam/:id', (req,res) => {
    const id = req.params.id;
    const sql = `Update exam_detail set exam_name = ? ,class = ?, exam_date= ?, exam_room= ? where exam_id = ?`
    db.query(sql,[req.body.exam_name,req.body.class,req.body.exam_date,req.body.exam_room,id], (err,result) => {
        if(err) return res.json({Status: false}, {Error:"Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_exam/:id', (req,res) => {
    const id = req.params.id;
    const sql = `Delete From exam_detail where exam_id = ?`;
    db.query(sql,[id],(err,result) => {
        if(err) return res.json({Status: false}, {Error: "Query Error"})
        return res.json({Status: true, Message: "Exam Deleted"})
    })
})

export { router as adminRouter };
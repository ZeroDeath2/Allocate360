import express from "express";
import db from '../utils/db.js';

const router = express.Router();

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

router.get('/student_count/:teacherId', (req, res) => {
    const teacherId = req.params.teacherId;
    var class_name;
    const sql = "Select class from teacher where user_id = ?";
    db.query(sql, [teacherId], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        if (result.length === 0) {
            return res.json({ Status: false, Error: "Teacher not found" });
        }
        class_name = result[0].class;
        const sql2 = "Select count(student.student_id) as student from student where class = ?";
        db.query(sql2, [class_name],(err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true, Result: result })
        })
    })
})

router.post('/add_student/:teacherId', (req, res) => {
    const teacherId = req.params.teacherId;
    var studentUserId = 0;
    var class_name;
    const sql1 = `INSERT INTO users (username, password, user_role) 
    VALUES (?, ?, 'student')`
    db.query(sql1, [req.body.name, req.body.password], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error 1" })
        const sql2 = `Select user_id from users Where username = ?`;
        db.query(sql2, [req.body.name], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error 2" })
            studentUserId = result[0].user_id;
            const sql3 = "Select class from teacher where user_id = ?";
            db.query(sql3, [teacherId], (err, result) => {
                if (err) return res.json({ Status: false, Error: "Query Error 3" + err })
                if (result.length === 0) {
                    return res.json({ Status: false, Error: "Teacher not found" });
                }
                class_name = result[0].class;
                const sql4 = `INSERT INTO student (user_id, student_name,admission_no,class,classroom_no,course) VALUES (?,?,?,?,?,?);`;
                db.query(sql4, [studentUserId,
                    req.body.name,
                    req.body.admno,
                    class_name,
                    req.body.classroom_no,
                    req.body.course], (err, result) => {
                        if (err) return res.json({ Status: false, Error: "Query Error 4" + err })
                        return res.json({ Status: true, message: 'Student added success' })
                    })
            })

        })
    })
})

router.get('/student/:teacherId', (req, res) => {
    const teacherId = req.params.teacherId;
    var class_name;
    const sql1 = "Select class from teacher where user_id = ?";
    db.query(sql1, [teacherId], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        if (result.length === 0) {
            return res.json({ Status: false, Error: "Teacher not found" });
        }
        class_name = result[0].class;
        const sql2 = "Select * from student where class = ?";
        db.query(sql2, [class_name],(err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true, Result: result })
        })
    })
})

router.get('/student_edit/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const sql = "Select * from student Where student_id = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_student/:studentId', (req,res) => {
    const studentId = req.params.studentId;
    const sql = `Update student set student_name = ?, admission_no = ?, classroom_no = ?, course = ? where student_id = ?`
    db.query(sql,[req.body.name,req.body.admno,req.body.classroom_no,req.body.course,studentId], (err,result) => {
        if(err) return res.json({Status: false}, {Error:"Query Error"})
        return res.json({Status: true, Result: result})
    })
})


router.get('/exam', (req, res) => {
    const sql = "Select exam_id,exam_name,class,DATE_FORMAT(exam_date, '%Y-%m-%d') AS exam_date,exam_room from exam_detail ";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/exam/:examId', (req, res) => {
    const examId = req.params.examId;
    const sql = "Select exam_name,class,DATE_FORMAT(exam_date, '%Y-%m-%d') AS exam_date,exam_room from exam_detail Where exam_id = ?";
    db.query(sql, [examId], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_exam', (req, res) => {
    const sql = `Insert into exam_detail (exam_name,class,exam_date,exam_room) values(?,?,?,?)`
    db.query(sql, [req.body.exam_name, req.body.class, req.body.exam_date, req.body.exam_room], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, message: 'Exam Added Successfully' })
    })
})

router.put('/edit_exam/:id', (req, res) => {
    const id = req.params.id;
    const sql = `Update exam_detail set exam_name = ? ,class = ?, exam_date= ?, exam_room= ? where exam_id = ?`
    db.query(sql, [req.body.exam_name, req.body.class, req.body.exam_date, req.body.exam_room, id], (err, result) => {
        if (err) return res.json({ Status: false }, { Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.delete('/delete_exam/:examId', (req, res) => {
    const examId = req.params.examId;
    const sql = `Delete From exam_detail where exam_id = ?`;
    db.query(sql, [examId], (err, result) => {
        if (err) return res.json({ Status: false }, { Error: "Query Error" })
        return res.json({ Status: true, Message: "Exam Deleted" })
    })
})

export { router as teacherRouter };
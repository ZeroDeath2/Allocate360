import express from "express";
import db from '../utils/db.js';
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
    const sql = "Select student_name,admission_no,student.class,classroom_no,course,exam_room,DATE_FORMAT(exam_date, '%Y-%m-%d') AS exam_date,exam_name,seat_no from student Join users On Student.user_id = users.user_id Join exam_detail On student.exam_id = exam_detail.exam_id Where users.user_id =  ?;"
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false ,Error: "Query Error"+err});
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

  
  const updateRoomAllottedStatus = async (seatNo, nextRoom) => {
    const sql7 = `UPDATE exam_room SET allotted = 1, last_seat_allotted = ? WHERE room_no = ?`;
    await db.promise().query(sql7, [seatNo, nextRoom]);
  };
  
  
router.post("/add_exam", async (req, res) => {
    const sql = `INSERT INTO exam_detail (exam_name, class, exam_date, exam_room) VALUES (?, ?, ?, ?)`;
  const classname=req.body.class;
  const examroom=req.body.exam_room;
    const examname = req.body.exam_name;
    try {
      await db.promise().query(sql, [
        req.body.exam_name,
        req.body.class,
        req.body.exam_date,
        req.body.exam_room,
      ]);

      const sql0 = `SELECT COUNT(*) as count FROM STUDENT  WHERE class = ? AND allotment_status = 0`;
    const sql1 = `SELECT ALLOTMENT_STATUS FROM STUDENT WHERE class = ? AND ALLOTMENT_STATUS = 0 GROUP BY CLASS`;
    const sql9=`SELECT student_id,admission_no FROM student WHERE class = ? AND ALLOTMENT_STATUS = 0`;
    const result9=await db.promise().query(sql9,[classname]);


    const result0 = await db.promise().query(sql0, [classname],(err) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})});
    console.log(result0[0]);
   
    const { ALLOTMENT_STATUS } = result0[0];
  
    const result1 = await db.promise().query(sql1, [classname],(err) => {
        if(err) return res.json({Status: false, Error: "Query Error"})});
        console.log(result1[0]);
    const { count } = result1[0];
    const sql10 = `select exam_id from exam_detail where exam_name = ?`;
    const result10=await db.promise().query(sql10, [examname]);
    const examId=result10[0][0].exam_id
    
  
    for(let i=0;i<result9[0].length;i++){
        console.log("hello123",result9[0][i])
        const sql2 = `SELECT CASE WHEN allotted = 0 THEN TRUE ELSE FALSE END AS is_allotted_zero FROM exam_room WHERE room_no = ?`;
        const result2 = await db.promise().query(sql2, [examroom],(err) => {
            if(err) return res.json({Status: false, Error: "Query Error"+err})});
    
        
        const { is_allotted_zero } = result2[0];
            var seatNo=0;
        console.log(result2[0]);
        if (is_allotted_zero==0){
            const sql3 = `SELECT room_name FROM exam_room WHERE room_order > ( SELECT room_order FROM exam_room WHERE room_name = ?) ORDER BY room_order LIMIT 1`;
        const result3 = await db.promise().query(sql3, [examroom]);
        const nextRoom= result3[0].room_name;
        const sql4 = `SELECT last_seat_allotted FROM exam_room WHERE room_no = ?`;
        const result4= await db.promise().query(sql4, [examroom]);
        console.log("last",result4[0][0]);
        const lastSeatAllotted= result4[0][0].last_seat_allotted;
        seatNo=lastSeatAllotted+1;
        }
        else{
            const sql4 = `SELECT last_seat_allotted FROM exam_room WHERE room_no = ?`;
        const result4= await db.promise().query(sql4, [examroom]);
        console.log(result4[0]);
        console.log('seat', result4[0])
        const lastSeatAllotted= result4[0][0].last_seat_allotted;
        seatNo=lastSeatAllotted+1;
        
        const sql5 = `INSERT INTO allotment (room_no, admission_no, seat_no,exam_id) VALUES (?, ?, ?,?)`;
        await db.promise().query(sql5, [examroom, result9[0][i].admission_no, seatNo,examId]);

        const sql11 = `Update exam_room set last_seat_allotted=? where room_no= ? `;
        const result12 = await db.promise().query(sql11,[seatNo,examroom]);
        const sql6 = `UPDATE student SET allotment_status = 1, seat_no=?,exam_id=? WHERE student_id = ?`;
        const result6 = await db.promise().query(sql6, [seatNo,examId,result9[0][i].student_id]);
        
    }
    
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.json({Status: true,message:"Success"})
  });
  
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
        const sql1=`UPDATE studet set allotment_status=0 ,seat_no=0 from student where exam_id=?`;
        db.query(sql1,[id],(err,result)=>{
            if(err) return res.json({Status: false}, {Error: "Query Error"})
            return res.json({Status: true, Result: result})
        })
        return res.json({Status: true, Message: "Exam Deleted"})
    })
})


router.get('/allotment',(req,res)=>{
    const sql=`Select room_no,admission_no,seat_no,exam_name,class  from allotment JOIN exam_detail ON allotment.exam_id = exam_detail.exam_id`;
    const result1= db.query(sql,(err,result)=>{
        if(err) return res.json({Status: false,Error: "Query Error"+err})
        return res.json({Status: true,Result:result})
    })
})
export { router as adminRouter };
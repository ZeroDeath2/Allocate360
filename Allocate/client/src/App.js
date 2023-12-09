import React from "react";
//import Axios from "axios";
import './App.css';
import Login from "./components/Login";
import StudentProfile from "./components/StudentProfile";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Admin from "./components/Admin";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import Student from "./components/Student"
import EditStudent from "./components/EditStudent";
import Teacher from "./components/Teacher";
import AddTeacher from "./components/AddTeacher";
import EditTeacher from "./components/EditTeacher";
import Exam from "./components/Exam";
import AddExam from "./components/AddExam";
import EditExam from "./components/EditExam";
import Allotment from "./components/Allotment";
import AllotmentT from "./components/AllotmentT";
import TeacherDashboard from "./components/TeacherDashboard";
import TeacherProfile from "./components/TeacherProfile";
import StudentT from "./components/StudentT";
import AddStudentT from "./components/AddStudentT";
import EditStudentT from "./components/EditStudentT";
import ExamT from "./components/ExamT";
import AddExamT from "./components/AddExamT";
import EditExamT from "./components/EditExamT";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/student/:id" element={<StudentProfile/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/teacherDashboard/:teacherId" element={<TeacherDashboard/>}>
           <Route path='' element={<TeacherProfile />}></Route>
           <Route path="/teacherDashboard/:teacherId/student" element={<StudentT/>}></Route>
           <Route path='/teacherDashboard/:teacherId/addStudent' element={<AddStudentT/>}></Route>
           <Route path='/teacherDashboard/:teacherId/edit_student/:studentId' element={<EditStudentT />}></Route>
           <Route path="/teacherDashboard/:teacherId/exam" element={<ExamT/>}></Route>
           <Route path="/teacherDashboard/:teacherId/addExam" element={<AddExamT/>}></Route>
           <Route path="/teacherDashboard/:teacherId/edit_exam/:examId" element={<EditExamT/>}></Route>
           <Route path="/teacherDashboard/:teacherId/allotment" element={<AllotmentT/>}></Route>
        </Route>
        
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path='' element={<Admin />}></Route>
          <Route path="/dashboard/student" element={<Student/>}></Route>
          <Route path="/dashboard/addStudent" element={<AddStudent/>}></Route>
          <Route path="/dashboard/edit_student/:id" element={<EditStudent/>}></Route>
          <Route path="/dashboard/teacher" element={<Teacher/>}></Route>
          <Route path="/dashboard/addTeacher" element={<AddTeacher/>}></Route>
          <Route path="/dashboard/edit_teacher/:id" element={<EditTeacher/>}></Route>
          <Route path="/dashboard/exam" element={<Exam/>}></Route>
          <Route path="/dashboard/addExam" element={<AddExam/>}></Route>
          <Route path="/dashboard/edit_exam/:id" element={<EditExam/>}></Route>
          <Route path="/dashboard/allotment" element={<Allotment/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "../styles/Student.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import student from "../img/Student.png";
import { useNavigate, useParams } from "react-router-dom";

const StudentProfile = () => {
  const [studentProfile, setStudentProfile] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch student profile data from the backend
    axios.get('http://localhost:3001/auth/student-profile/'+id)
      .then(result => {
        console.log(result.data);
          setStudentProfile(result.data[0])
      })
      .catch(error => console.error('Error fetching data:', error));
  });

  const handleLogout = () => {
    axios.get('http://localhost:3001/auth/logout')
    .then(result => {
      console.log(result.data.Status);
      if(result.data.Status){
        navigate('/login');
      }
    }).catch(err => console.log(err));
  }

  return (
    <div className="student-page">
      <header className="header">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <div className="student-containers">
        <div className="student-details-container">
          <div className="Student-header">
            <h2>Student Details</h2>
            <img src={student} alt="user-logo"/>
          </div>
          <div className="student-details-columns">
            <div className="left-column">
              <div className="student-details-col">
                <p><strong>Name:</strong> {studentProfile.student_name}</p>
              </div>
              <div className="student-details-col">
                <p><strong>Class:</strong> {studentProfile.class}</p>
              </div>
              <div className="student-details-col">
                <p><strong>Course:</strong> {studentProfile.course}</p>
              </div>
            </div>
            <div className="right-column">
              <div className="student-details-col">
                <p><strong>Admission No:</strong> {studentProfile.admission_no}</p>
              </div>
              <div className="student-details-col">
                <p><strong>Classroom No:</strong> {studentProfile.classroom_no}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="examination-details-container">
          <h2 className>Examination Details</h2>
          <div className="examination-details-inner-container">
            <div className="left-column">
              
              <div className="student-details-col">
                <p><strong>Exam Room No:</strong> {studentProfile.exam_room}</p>
              </div>
              <div className="student-details-col">
                <p><strong>Exam Date:</strong> {studentProfile.exam_date}</p>
              </div>
            </div>
            <div className="right-column">
              <div className="student-details-col">
                <p><strong>Subject:</strong> {studentProfile.exam_name}</p>
              </div>
              <div className="student-details-col">
                <p><strong>Seat No:</strong> {studentProfile.seat_no}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const StudentT = () => {
  const {teacherId} = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/authT/student/" +teacherId)
      .then((result) => {
        if (result.data.Status) {
          setStudent(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  const handleDelete = (studentId) => {
    axios.delete('http://localhost:3001/auth/delete_student/'+studentId)
    .then(result => {
      console.log(result.data);
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Student List</h3>
      </div>
      <Link to={`/teacherDashboard/`+teacherId+`/addStudent`} className="btn btn-success">
        Add Student
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Admission No</th>
              <th>Class</th>
              <th>Classroom No</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((e) => (
              <tr>
                <td>{e.student_name}</td>
                <td>{e.admission_no}</td>
                <td>{e.class}</td>
                <td>{e.classroom_no}</td>
                <td>{e.course}</td>
                <td>
                  <Link
                    to={`/teacherDashboard/`+teacherId+`/edit_student/` + e.student_id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.student_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentT;
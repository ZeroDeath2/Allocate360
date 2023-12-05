import axios from "axios";
import React, {useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddStudentT = () => {
  const { teacherId } = useParams();
  const [student, setStudent] = useState({
    name: "",
    admno: "",
    classroom_no: "",
    course: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/authT/add_student/"+teacherId , student)
      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          navigate('/teacherDashboard/'+teacherId +'/student');
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Student</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              <strong>Student Name :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Student's Name"
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAdmissionNo" className="form-label">
              <strong>Admission No :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAdmissionNo"
              placeholder="Enter Admission Number"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, admno: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputClassroomNo" className="form-label">
              <strong>Classroom No :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputClassroomNo"
              placeholder="Enter Classroom Number"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, classroom_no: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputCourse" className="form-label">
              <strong>Course :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputCourse"
              placeholder="Enter Course"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, course: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              <strong>Password :</strong>
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Add student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentT;

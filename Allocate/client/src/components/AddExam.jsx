import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExam = () => {
  const [exam, setExam] = useState({
    exam_name: "",
    exam_room: "",
    exam_date: "",
    class: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/add_exam", exam)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/exam");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Exam</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              <strong>Exam Name :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Exam Name"
              onChange={(e) =>
                setExam({ ...exam, exam_name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAdmissionNo" className="form-label">
              <strong>Class :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAdmissionNo"
              placeholder="Enter Class"
              autoComplete="off"
              onChange={(e) => 
                setExam({ ...exam, class: e.target.value })}
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
                setExam({ ...exam, exam_room: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputDate">
              <strong>Date :</strong>
            </label>
            <input
              type="date"
              name="inputDate"
              onChange={(e) => setExam({ ...exam, exam_date: e.target.value })}
              className="form-control rounded-0"
            />
          </div>

          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Add exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExam;
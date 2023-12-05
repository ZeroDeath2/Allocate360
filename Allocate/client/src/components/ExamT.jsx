import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ExamT = () => {
  const {teacherId, examId} = useParams();
  const [exam, setExam] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/authT/exam")
      .then((result) => {
        if (result.data.Status) {
          setExam(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (examId) => {
    axios
      .delete("http://localhost:3001/authT/delete_exam/" + examId)
      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Exam List</h3>
      </div>
      <Link
        to={`/teacherDashboard/` + teacherId + `/addExam`}
        className="btn btn-success"
      >
        Add Exam
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Room</th>
              <th>Date</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exam.map((e) => (
              <tr>
                <td>{e.exam_name}</td>
                <td>{e.exam_room}</td>
                <td>{e.exam_date}</td>
                <td>{e.class}</td>

                <td>
                  <Link
                    to={`/teacherDashboard/`+ teacherId +`/edit_exam/` + e.exam_id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.exam_id)}
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

export default ExamT;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Teacher = () => {
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/teacher")
      .then((result) => {
        if (result.data.Status) {
          setTeacher(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/auth/delete_teacher/'+id)
    .then(result => {
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
        <h3>Teacher List</h3>
      </div>
      <Link to="/dashboard/addTeacher" className="btn btn-success">
        Add Teacher
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teacher.map((e) => (
              <tr>
                <td>{e.teacher_name}</td>
                <td>{e.class}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_teacher/` + e.teacher_id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.teacher_id)}
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

export default Teacher;
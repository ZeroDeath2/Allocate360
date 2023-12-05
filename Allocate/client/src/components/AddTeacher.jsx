import axios from "axios";
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
  const [teacher, setTeacher] = useState({
    name: "",
    class: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/auth/add_teacher", teacher)
      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          navigate("/dashboard/teacher");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Teacher</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              <strong>Teacher Name :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Teacher's Name"
              onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputClass" className="form-label">
              <strong>Class :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputClass"
              placeholder="Enter Class"
              autoComplete="off"
              onChange={(e) =>
                setTeacher({ ...teacher, class: e.target.value })
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
                setTeacher({ ...teacher, password: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Add teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;

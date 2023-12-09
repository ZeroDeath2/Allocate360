import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TeacherDashboard = () => {
  const {teacherId} = useParams()
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  const handleLogout = () => {
    axios.get('http://localhost:3001/authT/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        navigate('/login')
      }
    })
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to={`/teacherDashboard/` + teacherId}
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                ALLOCATE 360
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to={`/teacherDashboard/` + teacherId}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/teacherDashboard/` + teacherId+ `/student`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Students
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/teacherDashboard/`+ teacherId +`/exam`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Exams</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`/teacherDashboard/`+ teacherId +`/allotment`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Allotment</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Allocate360</h4>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
import React, { useState } from "react";
import userLogo from "../img/userLogo.png";
import "../styles/Login.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/auth/login", values)
      .then((result) => {
        if (result.data.loginStatus) {
          if(result.data.Role == "admin"){
            navigate("/dashboard");
          }
          else if (result.data.Role == "teacher"){
            navigate("/teacherDashboard/" + result.data.id);
          }
          else if (result.data.Role == "student"){
            navigate("/student/" + result.data.id);
          }
        } else {
          setError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  // const login = () => {
  //   Axios.post("http://localhost:3001/auth/adminlogin", values).then((response) => {
  //     if (!response.data.message) {
  //       setLoginStatus(response.data.message);
  //     } else {
  //       setLoginStatus(response.data[0].username);
  //     }
  //   });
  // };

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   Axios.post("http://localhost:3001/auth/adminlogin", { username, password })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }

  return (
    <>
      <div className="Login-container">
        <div className="login-card">
          <div className="error-message">{error && error}</div>
          <div className="user-icon">
            <img src={userLogo} className="user-logo" alt="user-logo" />
          </div>
          <h3 className="login-title">LOGIN</h3>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                className="username"
                placeholder="Username"
                autoComplete="off"
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                className="password"
                placeholder="Password"
                autoComplete="off"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="login-button">
                Login
              </button>
              {/* <h1>{loginStatus}</h1> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

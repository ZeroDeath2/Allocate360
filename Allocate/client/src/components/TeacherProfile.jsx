import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TeacherProfile() {
  const {teacherId} = useParams();
  const [studentTotal, setStudentTotal] = useState(0);
  const [teacherProfile, setTeacherProfile] = useState([]);

  useEffect(() => {
    studentCount();
  }, []);

  useEffect(() => {
    // Fetch teacher profile data from the backend
    axios.get('http://localhost:3001/authT/teacher-profile/'+teacherId)
      .then(result => {
        setTeacherProfile(result.data[0])
      })
      .catch(error => console.error('Error fetching data:', error));
  });

  const studentCount = () => {
    axios.get("http://localhost:3001/authT/student_count/" + teacherId).then((result) => {
      if (result.data.Status) {
        setStudentTotal(result.data.Result[0].student);
      } else {
        alert(result.data.Error);
      }
    });
  };
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="pb-1">
            <h5 className="mt-3">
              <strong>Teacher Name:</strong> {teacherProfile.teacher_name}
            </h5>

          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>
              <strong>Class:</strong> {teacherProfile.class}
            </h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Students</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
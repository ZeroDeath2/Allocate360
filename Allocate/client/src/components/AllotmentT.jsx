import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Allotment = () => {
    const {teacherId} = useParams();
  const [allotment, setAllotment] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/authT/allotment/"+teacherId)
      .then((result) => {

        if (result.data.Status) {
          setAllotment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((error) => {
        console.error("Error fetching room allotment:", error);
      });
  }, [allotment,teacherId]);
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Room Allotment</h3>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
                <th>Exam Name</th>
              <th>Room Number</th>
              <th>Class</th>
              <th>Seat Number</th>
              <th>Registration Number</th>
            </tr>
          </thead>
          <tbody>
            {allotment.map((e) => (
              <tr>
                <td>{e.exam_name}</td>
                <td>{e.room_no}</td>
                <td>{e.class}</td>
                <td>{e.seat_no}</td>
                <td>{e.admission_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allotment;
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditStudentT = () => {
    const { teacherId, studentId } = useParams();
    const [student, setStudent] = useState({
        name: "",
        admno: "",
        classroom_no: "",
        course: "",
    });
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3001/authT/student_edit/'+studentId)
        .then(result => {
            setStudent({
                ...student,
                name: result.data.Result[0].student_name,
                admno: result.data.Result[0].admission_no,
                classroom_no: result.data.Result[0].classroom_no,
                course: result.data.Result[0].course,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/authT/edit_student/'+studentId, student)
        .then(result => {
          console.log(result.data.Status+'hi');
            if(result.data.Status) {
                navigate('/teacherDashboard/'+teacherId+'/student')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Student</h3>
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
              autoComplete='off'
              value={student.name}
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
              autoComplete='off'
              value={student.admno}
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
              autoComplete='off'
              value={student.classroom_no}
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
              autoComplete='off'
              value={student.course}
              onChange={(e) =>
                setStudent({ ...student, course: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100">
              Confirm Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditStudentT
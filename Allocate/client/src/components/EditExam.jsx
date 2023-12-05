import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditExam = () => {
    const {id} = useParams()
    const [exam, setExam] = useState({
        exam_name: "",
        exam_room: "",
        exam_date: "",
        class: "",
    });
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3001/auth/exam/'+id)
        .then(result => {
            setExam({
                ...exam,
                exam_name: result.data.Result[0].exam_name,
                class: result.data.Result[0].class,
                exam_date: result.data.Result[0].exam_date,
                exam_room: result.data.Result[0].exam_room,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/auth/edit_exam/'+id, exam)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/exam')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit exam</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              <strong>Exam Name :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter exam's Name"
              autoComplete='off'
              value={exam.exam_name}
              onChange={(e) => setExam({ ...exam, name: e.target.value })}
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
              autoComplete='off'
              value={exam.class}
              onChange={(e) =>
                setExam({ ...exam, class: e.target.value })
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
              value={exam.exam_room}
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
              value={exam.exam_date}
              onChange={(e) => setExam({ ...exam, exam_date: e.target.value })}
              className="form-control rounded-0"
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

export default EditExam;
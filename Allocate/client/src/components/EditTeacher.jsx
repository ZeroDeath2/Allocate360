import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditTeacher = () => {
    const {id} = useParams()
    const [teacher, setTeacher] = useState({
        name: "",
        class: "",
    });
      const navigate = useNavigate()

      useEffect(()=> {
        axios.get('http://localhost:3001/auth/teacher/'+id)
        .then(result => {
            setTeacher({
                ...teacher,
                name: result.data.Result[0].teacher_name,
                class: result.data.Result[0].class,
            })
        }).catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/auth/edit_teacher/'+id, teacher)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/teacher')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Teacher</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              <strong>Teacher Name :</strong>
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter teacher's Name"
              autoComplete='off'
              value={teacher.name}
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
              autoComplete='off'
              value={teacher.class}
              onChange={(e) =>
                setTeacher({ ...teacher, class: e.target.value })
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

export default EditTeacher;
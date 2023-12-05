import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Admin = () => {
  
  const [teacherTotal, setTeacherTotal] = useState(0)
  const [studentTotal, setStudentTotal] = useState(0)

  useEffect(() => {
    teacherCount();
    studentCount();
  }, [])


  const teacherCount = () => {
    axios.get('http://localhost:3001/auth/teacher_count')
    .then(result => {
      if(result.data.Status) {
        setTeacherTotal(result.data.Result[0].teacher)
      }
    })
  }
  const studentCount = () => {
    axios.get('http://localhost:3001/auth/student_count')
    .then(result => {
      if(result.data.Status) {
        setStudentTotal(result.data.Result[0].student)
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Teachers</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{teacherTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Students</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
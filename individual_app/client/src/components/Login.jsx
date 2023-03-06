import React, {useState} from 'react'
import axios from 'axios'
import {Link, NavLink, useNavigate} from 'react-router-dom'

const Login = () => {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    
    const[errors, setErrors] = useState({})

    //Redireccionar a otra página
    const navigate = useNavigate();

    //Evitar que la página se refresque al presionar el botón {withCredentials:true, credentials:'include'},
    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
          email,
          password
        },{withCredentials:true, credentials:'include'})
          .then((res)=>{
            console.log(res)
            navigate('/bright_ideas')
            // <p><Link to={`/unaserie/${serie._id}`}>Mas info</Link></p>

          })
          .catch((err)=>{
            console.log(err);
            setErrors(err)
          })
    }


  return (
    <div className='col-10 mx-auto'>
        <div className="loginexamen-principal">
        {/* <p>Register</p> */}
          <div id="enlace">
            <Link to={'/'}>Back to Register</Link>
          </div>
        </div>
        <form onSubmit={submitHandler} className="loginexamen">
          <fieldset>          
            <legend>Login</legend>

            <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Email:</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" onChange={(e)=>setEmail(e.target.value)}/> 
                  {errors?.response?.data?.error ? <span className='text-danger'> {errors?.response?.data?.error}</span> : null }<br></br>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Password:</label>
                <div className="col-sm-7">
                  <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/> 
                  {errors?.response?.data?.error ? <span className='text-danger'> {errors?.response?.data?.error}</span> : null }<br></br>
                 </div>
            </div>

              <div className="row mb-3">
                <div>
                  <button className='btn btn-primary col-10'>Login</button>
                </div>
              </div>

            </fieldset>
        </form>
    </div>
  )
}

export default Login
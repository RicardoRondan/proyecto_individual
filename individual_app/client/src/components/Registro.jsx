import React, {useState} from 'react'
import axios from 'axios'
import {Link, NavLink, useNavigate} from 'react-router-dom'

const Registro = () => {

    const[nombre, setNombre] = useState('')
    const[alias, setAlias] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword] = useState('')

    const[error, setError] = useState({})

    //Redireccionar a otra página
    const navigate = useNavigate();

    //Evitar que la página se refresque al presionar el botón   , {withCredentials:true, credentials:'include'}
    const submitHandler = (e) =>{
        e.preventDefault()
        setError('')
        axios.post('http://localhost:8000/api/registro', {
          nombre,
          alias,
          email,
          password,
          confirmPassword
        }) 
          .then((res)=>{
            console.log(res);
            // navigate('/')  debo ponerle una ruta
          })
          .catch((err)=>{
            console.log(err);
            // setError(err)
            setError(err)
          })
    }

  return (
    <div className='col-10 mx-auto'>
        <div className="registroexamen-principal">
        {/* <p>Register</p> */}
          <div id="enlace">
            <Link to={'/login'}>Back to Login</Link>
          </div>
        </div>
        <form onSubmit={submitHandler} className="registroexamen">       
          <fieldset>
              <legend>Register</legend>

              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">First Name</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" onChange={(e)=>setNombre(e.target.value)}/> 
                  {error?.response?.data?.errors?.nombre?.message ? <span className='text-danger'> {error?.response?.data?.errors?.nombre?.message}</span> : null }<br></br>
                </div>
              </div>
              
              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Alias:</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" onChange={(e)=>setAlias(e.target.value)}/> 
                  {error?.response?.data?.errors?.alias?.message ? <span className='text-danger'> {error?.response?.data?.errors?.alias?.message}</span> : null }<br></br>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Email:</label>
                <div className="col-sm-7">
                  <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}/> 
                  {error?.response?.data?.errors?.email?.message ? <span className='text-danger'> {error?.response?.data?.errors?.email?.message}</span> : null }<br></br>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Password:</label>
                <div className="col-sm-7">
                  <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/> 
                  {error?.response?.data?.errors?.password?.message ? <span className='text-danger'> {error?.response?.data?.errors?.password?.message}</span> : null }<br></br>
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Confirm Password:</label>
                <div className="col-sm-7">
                  <input type="password" className="form-control" onChange={(e)=>setConfirmPassword(e.target.value)}/> 
                  {error?.response?.data?.errors?.confirmPassword?.message ? <span className='text-danger'> {error?.response?.data?.errors?.confirmPassword?.message}</span> : null }<br></br>

                </div>
              </div>
              
              <div className="row mb-3">
                <div>
                  <button className='btn btn-primary col-10'>Register</button>
                </div>
              </div>

            </fieldset>
        </form>
    </div>
  )
}

export default Registro
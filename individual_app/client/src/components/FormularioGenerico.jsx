import React, {useState} from 'react'
import axios from 'axios'
import {Link, NavLink, useNavigate} from 'react-router-dom';

const FormularioGenerico = () => {
  const[nombre, setNombre] = useState('')
  const[fecha, setFecha] = useState('')

  const[error, setError] = useState({})

    //Redireccionar a otra página
    const navigate = useNavigate();

    
    //Evitar que la página se refresque al presionar el botón
    const submitHandler = (e) =>{
        e.preventDefault()
        setError('')
        axios.post('http://localhost:8000/api/creargenerico',{
          nombre,
          fecha,
          estado:'inicial'
        })
          .then((res)=>{
            console.log(res);
            navigate('/');
          })
          .catch((err)=>{
            console.log(err)
            
            setError(err)
            
          })
    }

  return (
           
            <div className='col-10 mx-auto'> 
                <div className="formularioexamen-principal">
                    <p>Project Manager</p>
                    <div id="enlace">
                      <Link to={'/'}>Back to Dashboard</Link>
                    </div>
                </div>
                <form onSubmit={submitHandler} className="formularioexamen">       
                  <fieldset>
                      <legend>Plan a new project</legend>

                      <div className="row mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Project:</label>
                        <div className="col-sm-7">
                          <input type="text" className="form-control" onChange={(e)=>setNombre(e.target.value)}/> 
                          {error?.response?.data?.errors?.nombre?.message ? <span className='text-danger'> {error?.response?.data?.errors?.nombre?.message}</span> : error?.response?.statusText ? <span className='text-danger'> {error?.response?.statusText}</span> : null }
                          {/* {error?.response?.statusText ? <span className='text-danger'> {error?.response?.statusText}</span> : null } */}
                          
                        </div>
                      </div>
                      
                      <div className="row mb-3">
                        <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Due Date:</label>
                        <div className="col-sm-7">
                          <input type="date" className="form-control" onChange={(e)=>setFecha(e.target.value)}/> 
                          {error?.response?.data?.errors?.fecha?.message ? <span className='text-danger'> {error?.response?.data?.errors?.fecha?.message}</span> : null }<br></br>
                        </div>
                      </div>
                      
                      <div className="row mb-3">
                        <div>
                          <button className='btn btn-primary col-10'>Plan Project</button>
                        </div>
                      </div>

                  </fieldset>
                </form>
            </div>
  )
}

export default FormularioGenerico
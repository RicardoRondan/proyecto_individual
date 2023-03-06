import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate, Link, NavLink,} from 'react-router-dom';

const EditarMovie = () => {

    const[titulo, setTitulo] = useState('')
    const[creador, setCreador] = useState('')
    const[rating, setRating] = useState('')
    const[resenia, setResenia] = useState('')

    //Captura de error
    const[errors, setErrors] = useState({})
    //Edición de objeto-documento
    // const [serie, setSerie] = useState({})
    
    //obtener id de url
    const {id} = useParams()
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/obtenerunamovie/${id}`)
        .then((res)=>{
            console.log(res);
            setTitulo(res.data.titulo)
            setCreador(res.data.critica.o.creador)
            setRating(res.data.rating)
            setResenia(res.data.resenia)
        }).catch((err)=>{
            console.log(err);
        })
    }, [])

    //Evitar que la página se refresque al presionar el botón
    const submitHandler = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/editarmovie/${id}`,{
          titulo,
          creador,
          rating,
          resenia
        })
          .then((res)=>{
            console.log(res);
            navigate(`/movies/${id}`)
          })
          .catch((err)=>{
            console.log(err);
            setErrors(err.response.data.errors)
          })
    }

  return (
    <div>
        <div className="formularioEncabezado">
            <div id="C">
                    <h3>Moldy Tomatoes</h3>
            </div>
            <div id="D">
                    <button>Logout</button>
            </div>                
        </div> 
                 
        <br></br>
        <div className="formulariocontenedorTablaExterno">
            <div className="formulariocontenedorTablaIntermedio">
                <div id="E">
                    <h3>Add a Review for {titulo}</h3>
                </div>               
            </div>
            <div className='col-10 mx-auto'>
              <form onSubmit={submitHandler} id="formularioTablaLista">
                  {/* <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Movie Title</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" onChange={(e)=>setTitulo(e.target.value)}/> 
                      {errors.titulo ? <span className='text-danger'> {errors.titulo.message} </span> : null}<br></br>
                    </div>
                  </div> */}

                  <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Your Name</label>
                    <div className="col-sm-4">
                      <input type="text" value={creador} className='form-control' onChange={(e)=>setCreador(e.target.value)}/>
                      {errors.creador ? <span className='text-danger'>{errors.creador.message} </span>: null}<br></br>          
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Rating</label>
                    <div className="col-sm-4">
                      <select type="text" value={rating} className="form-control" onChange={(e)=>setRating(e.target.value)}>
                        <option>Select a Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      {errors.rating ? <span className='text-danger'> {errors.rating.message}</span> : null }<br></br>                                               
                    </div>
                  </div>
                  
                  <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-4 col-form-label">Your Review</label>
                    <div className="col-sm-6">
                      <input id="formularioinput" type="text" value={resenia} className='form-control' onChange={(e)=>setResenia(e.target.value)}/>
                      {errors.resenia ? <span className='text-danger'> {errors.resenia.message}</span> : null }<br></br>
                    </div>
                  </div>                   

                  <div id="formularioboton">
                      <div>          
                          <button className='btn btn-success col-2'>Submit</button>
                      </div>
                      <div>
                          <button className='btn btn-success col-2'><NavLink id="formulario" to={'/movies/'}>Cancel</NavLink></button>
                      </div>
                  </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default EditarMovie
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, Link, NavLink, useNavigate} from 'react-router-dom';

const ListadoGenerico = () => {
  const[lista, setLista] = useState([])
  const[idea, setIdea] = useState('')
  const[error, setError] = useState({})

  const[user, setUser] = useState('')

  //Redireccionar a otra página
  const navigate = useNavigate();
  
    useEffect(()=>{
        axios.get('http://localhost:8000/api/obtenergenericos')
        .then((res)=>{
            console.log(res);
            setLista(res.data)
        }).catch((err)=>{
            console.log(err);
             
        })
    }, [])  

    const CargarLista= (e) =>{
      axios.get('http://localhost:8000/api/obtenergenericos')
        .then((res)=>{
            console.log("RicardoCargarLista1: ",res);
            setLista(res.data)
        }).catch((err)=>{
            console.log(err);
             
        })
    }

    //Evitar que la página se refresque al presionar el botón
    const submitHandler = (e) =>{
        e.preventDefault()
        // setError('')
        axios.post('http://localhost:8000/api/creargenerico',{
          idea,
          user,
          likes : {user, 0}
        })
          .then((res)=>{
            console.log(res);
            // navigate('/');
            CargarLista();
          })
          .catch((err)=>{
            console.log(err)            
            setError(err)            
          })
    }

    const CargarLike = (id,like) =>{
        console.log("Cual es el valor de like al entrar en CargarLike? ", like)
        axios.put(`http://localhost:8000/api/editargenerico/${id}`,{
          likes: like+1
          })
          .then((res)=>{
              console.log("RicardoLike1: ", res);
              CargarLista();
          })
          .catch((err)=>{
              console.log("RicardoLike2error: ",err);  
              console.log("RicardoLike3error: ",err.data);               
             
          })
    }

    //Evitar que la página se refresque al presionar el botón
    const deleteHandler = (id) =>{
      // socket.emit('borrarSerie',id)
      // navigate('/todaserie')                                 , {withCredentials:true}
      // e.preventDefault()
      axios.delete(`http://localhost:8000/api/borrargenerico/${id}`)
        .then((res)=>{
          // navigate('/')
          CargarLista();
        })
        .catch((err)=>{
          console.log(err);
        })
    } 

  return (
            <div>
                <div className='col-10 mx-auto'> 
                    <div className="listadoexamen-principal">
                        <div>
                            <p>Hola </p>
                        </div>

                        <div id="enlace">
                            <Link >Logout</Link>
                            {/* to={'/'} */}
                        </div>
                    </div>
                    <div>
                        <form onSubmit={submitHandler} className="listadoexamen">       
                          <fieldset>
                              {/* <legend>Legend</legend> */}
                            <div id="primerdiv" className="row mb-3">                        
                                  <button className='btn btn-primary'>Idea!</button>
                                  
                                <div className="col-sm-7">
                                  <input type="text" className="form-control" placeholder='Post something witty here...' onChange={(e)=>setIdea(e.target.value)} /> 
                                  {error?.response?.data?.errors?.idea?.message ? <span className='text-danger'> {error?.response?.data?.errors?.idea?.message}</span> : null }
                                </div>
                            </div>

                          </fieldset>
                        </form>
                    </div>
                    <table id="listadoTablaLista" className="table table-white">
                      <tbody>
                          {   
                              lista.map((lista) =>{
                                  return(
                                      <tr>
                                          <td>
                                            <div>Nombre says:</div>
                                          </td>
                                          <td>
                                            <div className='cuadrito'> {lista.idea} </div>
                                          </td>                               
                                          <td>
                                              <div>
                                                <Link onClick={()=>CargarLike(lista._id, lista.likes.like)}>Like</Link>
                                                <Link to={`/bright/ideas/${lista._id}`} >{lista.likes.like} persona/s</Link>
                                              </div>                                            
                                          </td>
                                          <td>
                                              <div>
                                                <button className="btn btn-primary" onClick={()=>deleteHandler(lista._id)}>Delete</button>
                                              </div>
                                          </td>
                                      </tr>
                                  )                       
                              })
                              
                          }                
                      </tbody>
                    </table>
                </div>
            </div>                   
  )
}

export default ListadoGenerico
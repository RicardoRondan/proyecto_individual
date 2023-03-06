import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams, useNavigate, Link, NavLink} from 'react-router-dom';

const UnGenerico = () => {

    //Edición de objeto-documento
    const [lista, setLista] = useState({})
    
    //obtener id de url
    const {id} = useParams()
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/obtenerungenerico/${id}`)
        .then((res)=>{
            console.log("RicardoUnGenericoUseEfect: ",res);
            setLista(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <div className='col-10 mx-auto'>
        <div className="ungenericoexamen-principal">
        {/* <p>Register</p> */}
            <div id="enlace">
                <div>
                    <Link to={'/bright_ideas'}>Bright Ideas</Link>
                </div>
                <div>
                    <Link to={'/logout'}>Logout</Link>
                </div>            
            </div>
        </div>
        
        <table id="ungenericoTablaLista" className="table table-white">
            <tbody>
                <tr>
                    <td>
                        <div>Nombre says:</div>
                    </td>
                    <td className='cuadrito'>
                        {lista.idea}
                    </td>                               
                    <td>
                        <div>
                            {/* editar la idea cargando +1 like y volviendo a cargar la lista*/}
                            {/* <Link onClick={()=>CargarLike(lista._id, lista.like)}>Like</Link> */}
                            {/* obtener y mostrar la cantidad de like que tiene una idea */}
                            {/* <Link to={`/bright/ideas/${lista._id}`} >{lista.like} persona/s</Link> */}
                        </div>                                            
                    </td>
                    <td>
                        <div>
                            {/* <button className="btn btn-primary" onClick={()=>deleteHandler(lista._id)}>Delete</button> */}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div className="ordenar">
            <h2>People who liked this post</h2>
        </div>
            <table id="ungenericoTablaListaBordes" className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Alias</th>
                        <th>Nombre</th>
                    </tr>
                    {/* {   
                        lista.map((lista) =>{
                            return(
                                */}
                                <tr>
                                    {/* <td>{lista.alias} Hola</td>
                                    <td>{lista.nombre} mundo</td> */}
                                    <th>Hola</th>
                                    <th>Mundo loco</th>
                                </tr>
                            {/* )                       
                        })
                    }                 */}
                </thead>            
            </table> 
    </div>
  )
}

export default UnGenerico
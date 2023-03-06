import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams, useNavigate, Link, NavLink} from 'react-router-dom';

const UnUsuario = () => {

    //Edición de objeto-documento
    const [lista, setLista] = useState({})
    
    //obtener id de url
    const {id} = useParams()
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/obtenerunusuario/${id}`)
        .then((res)=>{
            console.log("RicardoUnUsuarioUseEfect: ",res);
            setLista(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <div className='col-10 mx-auto'>
        <div className="unusuarioexamen-principal">
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
        <p>Name:</p>
        <p>Alias:</p>
        <p>Email:</p>
        <hr></hr>    
        <p>Total Number of Posts:</p>
        <p>Total Number of Likes:</p>
    </div>
  )
}

export default UnUsuario
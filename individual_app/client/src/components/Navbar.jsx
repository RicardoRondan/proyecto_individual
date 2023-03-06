import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div id="navegador" className='bg-dark'>
        <h1 className='text-info'></h1>
        <NavLink to="/"> Registro </NavLink>
        <NavLink to="/login"> Login </NavLink>
        <NavLink to="/bright_ideas">Listado</NavLink>
        <NavLink to="/bright/ideas">UnGenerico</NavLink> 
        <NavLink to="/formulario">EjemploFormulario</NavLink>
     

    </div>
  )
}

export default Navbar
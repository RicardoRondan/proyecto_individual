import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {io} from 'socket.io-client';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FormularioGenerico from './components/FormularioGenerico';
import Registro from './components/Registro';
import Login from './components/Login';
import ListadoGenerico from './components/ListadoGenerico';
import UnGenerico from './components/UnGenerico';
import UnUsuario from './components/UnUsuario';





function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Registro/>}/>                     
          <Route path='/login' element={<Login/>}/>
          <Route path='/formulario' element={<FormularioGenerico/>}/>          
          <Route path='/bright_ideas' element={<ListadoGenerico/>}/>                 
          <Route path='/bright/ideas/:id' element={<UnGenerico/>}/>

          {/* <Route path='/users/:id' element={<UnUsuario/>}/>            */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

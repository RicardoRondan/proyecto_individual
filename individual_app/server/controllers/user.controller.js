const User = require('../models/user.model')

//Encriptar
const bcrypt = require('bcrypt')

//Registra quien está conectado (Hace un seguimiento)
//Utilizado para crear y firmar tokens
const jwt = require('jsonwebtoken')

//Llamamos al componente que contiene una cadena secreta
const SECRET = process.env.SECRET_KEY

module.exports = {
    

    // registrarUser: async (request, response) => {
    //     const {firstName,alias,email,password} = request.body;
    
    //     if(!firstName || !alias || !email || !password){
    //         response.statusMessage = "Los campos: nombre, apellido, alias y contraseña son obligatorios.";
    //         return response.status(406).end();
    //     }
    //     else{
    //         if(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)){
    //             console.log("OK") 
            
    
    //             bcrypt.hash(password,saltRounds)
    //                 .then(passwordEncriptado => {
    //                     User.findOne({email}).then(usuarioObtenido => {
    //                         if(usuarioObtenido){
    //                             response.statusMessage = "El email utilizado ya existe en la base de datos.";
    //                             return response.status(406).end();
    //                         }
    //                         else{
    //                             const nuevoUsuario = {firstName,alias,email,password:passwordEncriptado};
    //                             User.create(nuevoUsuario)
    //                                 .then(usuarioCreado => {
    //                                     const payload ={
    //                                         firstName:usuarioCreado.firstName,
    //                                         alias:usuarioCreado.alias,
    //                                         email:usuarioCreado.email,
    //                                         _id:usuarioCreado._id
    //                                     };
    
    //                                     return response.status(200).json({mensaje: "éxito!!!"})
    //                                 })
    //                                 .catch(err => {
    //                                     response.statusMessage = "Hubo un error al intentar registrar al usuario. "+err;
    //                                     return response.status(400).end();
    //                                 })
    //                         }
    //                     }).catch( err => {
    //                         response.statusMessage = "Hubo un error al intentar registrar al usuario. "+err;
    //                         return response.status(400).end();
    //                     });
    //                 })
    //         }
    //         else{
    //             response.statusMessage = "El email proporcionado no es valido.";
    //             return response.status(406).end();
    //         }
    //     }
    // },

    registrarUser: async(req, res) => {
        try{
            const nuevoUser = await User.create(req.body)
            const userToken = jwt.sign({_id:nuevoUser._id}, SECRET)
            res.status(201).cookie('userToken', userToken, {httpOnly:true})
            .json({successMessage:"Usuario registrado", user: nuevoUser})
        }catch(error){
            res.status(400).json(error)        
        }
    },

    loginUser: async (req, res) => {
        console.log("pruebita", req.body.email)
        const userlogin = await User.findOne({email:req.body.email})
        console.log("El usuario que intenta ingresar es", userlogin)
        if(!userlogin){
            res.status(400).json({error: "Email/Password incorrecto"})
        }
        try{
            const passwordValida = await bcrypt.compare(req.body.password, userlogin.password)
            console.log("Password Valida", passwordValida)
            if(!passwordValida){
                res.status(400).json({error: "Email/Password incorrecto"})
            }else{
                console.log("Entramos al else para enviar userToken", userlogin)
                const userToken = await jwt.sign({_id:userlogin._id}, SECRET)
                console.log("pruebaaa userToken", userToken)
                res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({mensaje:"Usuario Logueado"})
            }
        }
        catch(error){
            res.status(400).json({error: "Email/Password incorrecto"})
        }
    },

    logOutUser:(req,res)=>{
        res.clearCookie('userToken')
        res.json({success:'Usuario salio'})
    }
}
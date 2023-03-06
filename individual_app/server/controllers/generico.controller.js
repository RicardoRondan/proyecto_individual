const Generico = require('../models/generico.model')

const crearGenerico = (req, res) => {
    Generico.create(req.body)
    .then((resultado)=>{
        console.log(res.body)
        res.json(resultado)
    })
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })            

    // const {nombre} = req.body;

    // Generico.findOne({nombre}).then(usuarioObtenido => {
    //     if(usuarioObtenido){
                      

    //         res.statusMessage = "The name already exists";

    //         return res.status(406).end();
    //     }
    //     else{
                




    //     }
    // })
    
}

const obtenerGenericos =(req, res) => {
    Generico.find(req.body)
    .then((resultado)=>{
        res.json(resultado)    
    })
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}

const obtenerUnGenerico =(req, res) => {
    Generico.findById({_id:req.params.id})
    .then((resultado)=>{
        res.json(resultado)    
    })
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}

const editarGenerico = (req, res) => {
    Generico.updateOne({_id:req.params.id}, req.body, {runValidators:true})
    .then((resultado)=>{
        // console.log("Intento de editar: ", req.body)
        res.json(resultado)    
    })
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}

const borrarGenerico = (req, res) => {
    Generico.deleteOne({_id:req.params.id})
    .then((resultado)=>{
        // console.log("Intento de eliminar: ", req.body)
        res.json(resultado)    
    })
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}

module.exports = {
    crearGenerico,
    obtenerGenericos,
    obtenerUnGenerico,
    editarGenerico,
    borrarGenerico
}
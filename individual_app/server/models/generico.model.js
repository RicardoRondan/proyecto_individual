const mongoose = require('mongoose')

//Schema (Base de Datos)
const schema_generico = mongoose.Schema({
    idea:{
        type:String,
        required:[true, "Complete el campo idea"],
        minLength:[3,"Idea: 3 characters minimum"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:[true, "El usuario es requerido (modelo user)."]
    },
    likes:[{
        user:{
            type:mongoose.Types.ObjectId,
            ref:"users",
            required:[true, "El usuario es requerido (modelo likes user)."]
        },
        like:{
            type:Number
        }
    }]

},{timestamps:true})

//Modelo (Colección)
const Generico = mongoose.model('Generico', schema_generico)
//Exportarlo para que pueda ser utilizado por otro archivo o módulo
module.exports = Generico
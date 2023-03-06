const ControladorGenerico = require('../controllers/generico.controller')

module.exports = (app) =>{
    app.post('/api/creargenerico', ControladorGenerico.crearGenerico)
    app.get('/api/obtenergenericos', ControladorGenerico.obtenerGenericos)
    app.get('/api/obtenerungenerico/:id',  ControladorGenerico.obtenerUnGenerico)
    app.put('/api/editargenerico/:id',  ControladorGenerico.editarGenerico)
    app.delete('/api/borrargenerico/:id', ControladorGenerico.borrarGenerico)
}
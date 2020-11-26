const mongoose = require("mongoose");
// crear el esquema
const esquemaProducto = new mongoose.Schema({
    
    nombre: {
        type: String,
        
    },
    precio: {
        type: String,
        
    },
    imagen: {
        type: String,
        
    },
});
// crear los exports
const Producto = mongoose.model("producto", esquemaProducto);
module.exports.Producto = Producto;
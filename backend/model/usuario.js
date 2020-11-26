//Modulos internos
const mongoose = require("mongoose");
const jwt =require("jsonwebtoken");

//Esquema
const esquemaUsuario = new mongoose.Schema({
  nombre:String,
  cedula:String,
  edad:Number,
  telefono:String,
  rol:String,
  correo:String,
  password:String,
  fechaRegistro:{
    type:Date,
    default:Date.now,
  }
});

//Generar jwt
esquemaUsuario.methods.generateJWT = function (){
  return jwt.sign({
    _id: this._id,
    nombre: this.nombre,
    correo: this.correo
  },"clave")
};

//Exports
const Usuario = mongoose.model("usuario", esquemaUsuario);
module.exports.Usuario = Usuario;
// module.exports.esquemaUsuario = esquemaUsuario;
//Modulos nodeJs
const express = require("express");
const router = express.Router();

//Modulos internos
const{ Usuario } = require("../model/usuario");

//Ruta
router.post("/", async(req, res) =>{
  let usuario = await Usuario.findOne({correo: req.body.correo});
  //Si encuentra el correo en bd
  if(usuario) return res.status(400).send("El correo ya esta registrado en esta Base de datos");
  
  let usuario2 = await Usuario.findOne({cedula: req.body.cedula});
  //Si encuentra la cedula en bd
   if(usuario2) return res.status(400).send("La cedula ya esta registrada en esta Base de datos");
  
  //Si no existe en bd
  usuario = new Usuario({
    nombre: req.body.nombre,
    cedula: req.body.cedula,
    edad: req.body.edad,
    telefono: req.body.telefono,
    rol: req.body.rol,
    correo: req.body.correo,
    password: req.body.password
  })
  //Guardamos el usuario q se va a crear con jwt
  const result = await usuario.save();
  const jwtToken = usuario.generateJWT();
  res.status(200).send({jwtToken});
});


//Exports
module.exports = router;
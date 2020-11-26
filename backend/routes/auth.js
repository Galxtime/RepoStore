// Modulos de Node
const express = require("express");
const router = express.Router();


// Modulos internos para el sistema de login traemos el modelo usuario
const { Usuario } = require("../model/usuario");
// Ruta
router.post("/", async (req, res) => {
  // Validamos que el correo exista
  const usuario = await Usuario.findOne({ correo: req.body.correo });
  // Si el correo no existe
  if (!usuario)
    return res.status(400).send("Correo o contraseña no son validos");
  // si el pass no existe
  if (usuario.pass !== req.body.pass)
    return res.status(400).send("Correo o contraseña no son validos");
  // cuando una persona se loguea Generamos un JWT para que index.js lo pueda utilizar
  // lo importamos desde el model de usuario
  const jwtToken = usuario.generateJWT();
  res.status(200).send({ jwtToken });
});
module.exports = router;

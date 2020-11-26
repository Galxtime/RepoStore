//Modulo de Node
const jwt = require("jsonwebtoken");

//Validacion para identificar el usuario logueado y todos sus procesos
function auth(req, res, next) {
  let jwtToken = req.header("Authorization");
  if(!jwtToken) return res.status(405).send("No hay token para un acceso");

  //Split al jwt para separar el bearer que pone por defecto el header del auth
  jwtToken = jwtToken.split(" ")[1];
  //si el token no existe
  if(!jwtToken) return res.status(405).send("No hay token para un acceso");

  //Si el token existe
  try{
    const payload = jwt.verify(jwtToken, "clave");
    req.usuario = payload;
    next();
  } catch(error){
    res.status(405).send("token sin autorizacion");
  }
}

//exports
module.exports = auth;
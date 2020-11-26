// API a funcionar nos llega por metodo POST desde angular los campos que registro el usuario 
const express= require("express");
const router= express.Router();

//modulos internos creados por el desarrollador
// Tablero donde guardar
const { Producto }  = require("../model/producto");
// usuario es el que hace el registro para hacer una actividad
const { Usuario } = require("../model/usuario");
// middleware pendiente de vigilancia del usuario 
const auth = require("../middleware/auth");
const cargarArchivo= require("../middleware/file")


// Listar actividades del usuario con GET 
// autenticación pasar por el proceso de middleware para verificar usuario
router.get("/cargarArchivo", async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
   const producto = await Producto.find();
    res.send(producto)
});   
   

// PARA LAS RUTAS SE RECOMIENDA  utilizar ASYNC - AWAY mientras para conexiones con DB el then()catch()


//REGISTRAR ACTIVIDAD POST ruta primero hace el proceso con middleware quien esta logeado trae correo &pass

//Crear actividad con imagen
//.single sticker el archivo viene desde angular
router.post("/cargarArchivo",  cargarArchivo.single("imagen"),    async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    
    let rutaImagen = null;
    // req.file es objecto que nos proporciona información del objecto que se esta subiendo
    if (req.file.filename) {
      rutaImagen = url + "/public/" + req.file.filename;
    } else {
      rutaImagen = null;
    }
    // Guardar la actividad con imagen en BD
    const producto = new Producto({
      nombre: req.body.nombre,
      precio: req.body.precio,
      imagen: rutaImagen,      
    });
    // Enviamos resultado
    const result = await producto.save();
    res.status(200).send(result);
  }
);

//Actualizar actividad 

router.put("/", auth, async (req, res) => {
   // Buscamos el usuario por id
   const usuario = await Usuario.findById(req.usuario._id);
   // Si el usuario no existe
   if (!usuario) return res.status(400).send("El usuario no existe en BD");
   // si el usuario existe
   
   const producto = await Producto.findByIdAndUpdate(
     req.body._id,
     {
       idUsuario: req.usuario._id,
       nombre: req.body.nombre,
       precio: req.body.precio,
       imagen: rutaImagen,
       
     },
     {
       new: true,
     }
   );
   if (!producto)
     return res.status(400).send("No hay producto asignada a este usuario");
   res.status(200).send(producto);
 });
 // Eliminar el usuario , traemos un parametro del id de la tarea
 router.delete("/:_id", auth, async (req, res) => {
   // Buscamos el usuario por id
   const usuario = await Usuario.findById(req.usuario._id);
   // Si el usuario no existe
   if (!usuario) return res.status(400).send("El usuario no existe en BD");
   // si el usuario existe eliminamos una actividad nuestra Colección tablero con find 
   const producto = await Producto.findByIdAndDelete(req.params._id);
   if (!producto)
   return res.status(400).send("No se encuentra tarea a eliminar");
   // message: estable comunicacion con el front le da la orden a Angular de borrar en html
    res.status(200).send({message:"Actividad eliminada"});
});



module.exports = router;
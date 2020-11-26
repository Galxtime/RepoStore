// modulos de node multer manejan las funciones con cb
const multer = require("multer");
// ruta del directorio donde quedaran los archivos
const directorio = "./public";
// DiskStorage donde se van a colocar y administrar las imagenes en la carpeta public
//los callback llevan información de destination (directorio y filename) hacia cargarArchivo=multer
const storage = multer.diskStorage({
  //  destination(Estructura Multer) que carpeta voy a seleccionar
  // req de una petición que se envio
   destination: (req, file, cb) => {
    // si el destino existe null validar no esta el archivo con trycatch(interno), si no guardar en directorio
    //funcio  callback enviar cosas que estan dentro de una función
    cb(null, directorio);
  },
// (Estructura filename)
  filename: (req, file, cb) => {
        // fecha de ahora separado con un guión concatenamos  el file el archivo que  me llege  pasarlo en minusculas
    // .split()identifica el espacio y con.join remplaza los espacios con un guión
    const filename =
// Filename se encarga de organizar la imagen y guardarla en el servidor
      Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-");
      cb(null, filename)
  },
});
// Cargar archivos
const cargarArchivo = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype)
    if (
      // mimetype puedo saber las extensiones de los archivos que llegaron
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"|| 
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif" ) {
        // si recibe un null envia error y el true aprueba los tipos de archivos esta bien
      cb(null, true);
    } else {
      // si no son los tipos de archivos false y null para enviar error con multer
      cb(null, false);
      return cb(new Error("Solo se acepta extenciones .jpg - .png - .gif"));
    }
  },
});


module.exports = cargarArchivo;
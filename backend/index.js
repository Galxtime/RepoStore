//Modulos Nodejs
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Modulos internos
const usuario = require("./routes/usuario");
const auth = require("./routes/auth");
const producto= require("./routes/producto");

//App
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth/", auth);
app.use("/api/producto/", producto);
app.use('./public', express.static('public'));


//Puerto de conexion
const port = process.env.PORT || 3000;
app.listen(3000, () => console.log("Ejecutando en el puerto:" + port));


//Conexion MongoDB
mongoose.connect("mongodb://localhost/pidecerca",{
  useNewUrlParser: true, 
  useFindAndModify: false, 
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => console.log("Conexion a MongoDB: Online"))
.catch((error) => console.log("Conexion a MongoDB: Offline"));
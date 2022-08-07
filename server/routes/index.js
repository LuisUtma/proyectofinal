const express = require("express");
const app = express();
const usuario = require ("./usuario");
const Empresa = require ("./empresa");
const Puesto = require ("./puesto");

app.use("/usuario", usuario);//http://localhost:3000/api/usuario/
app.use("/empresa", Empresa);
app.use("/puesto", Puesto);

module.exports = app;
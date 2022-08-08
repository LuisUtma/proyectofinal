const express = require("express");
const app = express();
const usuario = require ("./Usuario");
const Empresa = require ("./Empresa");
const Puesto = require ("./Puesto");

app.use("/Usuario", usuario);//http://localhost:3000/api/usuario/
app.use("/Empresa", Empresa);
app.use("/Puesto", Puesto);

module.exports = app;
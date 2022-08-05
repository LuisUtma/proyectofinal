const express = require("express");
const app = express();
const usuario = require ("./usuario");
const Empresa = require ("./empresa");
const Puesto = require ("./empresa");

app.use("/usuario", usuario);//http://localhost:3000/api/usuario/
app.use("/empresa", Empresa);
app.use("/empresa", Puesto);

module.exports = app;
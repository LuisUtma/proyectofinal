const bcrypt = require('bcrypt');
const { request } = require("express");
const { model, default: mongoose } = require("mongoose");
const express = require("express");
const { response } = require(".");

const { db } = require('../models/Usuario.models');
const Usuariomodel = require('../models/Usuario.models');
const email = require("../libraries/Email");

const router = express.Router();

router.post("/Email", (req, res) => {
    const strNombre =req.body.strNombre;
     const strCorreo = req.body.strCorreo;
     const strPrimerApellidos = req.body.strPrimerApellidos;
     const strSegundoApellido = req.body.strSegundoApellido;
     const nmbEdad = req.body.nmbEdad;

     console.log(req.body);

    email.sendEmail(strCorreo, {strNombre, strCorreo, strPrimerApellidos, strSegundoApellido, nmbEdad})
    .then((response) =>{
        


        return res.status(200).json({
            msg: "Enviado exitosamente",
            status: 200,
            cont: {
                response
            }
        });
    })
    .catch((error) => {
        return res.status(200).json({
            msg: "Error ",
            status: 200,
            cont: {
                error: error.message
            }
        });
    });
});




     


router.post('/', (req, response) => {

    
    const usuario = new Usuariomodel(req.body);
    usuario.save()
    .then((UsuarioRegistrado) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                usuario: UsuarioRegistrado
            }
        });
        
    })
    .catch((err) => {
        return response.status(400).json({
            msg:"Error al registrar el usuario",
            status: 400,
            cont: {
                error: err
            }
        });
    });

});

router.get("/:id", (req, res) => {
 let id = req.params.id
 Usuariomodel.findById(id, (err, Usuariomodel)=>{
    if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
    if (!Usuariomodel) return res.status(404).send({message: 'El usuario no existe'})

    res.status(200).send({Usuariomodel})
}) 
});


router.get("/", (request, response) => {
   
   
     const registro =  Usuariomodel.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto la tabla usuario exitosamente",
            status: 200, 
            cont: {
                 registro
               
            }
        });

    })
    .catch((err) => {
            return response.status(500).json({
                msg:"Error al consultar los datos de los usuarios.",
                status: 500,
                cont: {
                    error: err
                }
            });
    });

});


router.put('/:id', (req, res) => {
    let id = req.params.id
    let update = req.body
    Usuariomodel.findByIdAndUpdate(id,update,(err, usuarioupdated)=>{
        if (err) res.status(500).send({message:'Error la Actualizar el usuario: $'})
        res.status(200).send({Usuariomodel: usuarioupdated})
    }) 
});


router.delete('/:id', (req, res) => {
    let id = req.params.id
    Usuariomodel.findByIdAndDelete(id, (err, Usuariomodel)=>{
        if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
        if (!Usuariomodel) return res.status(404).send({message: 'El usuario no existe'})
    
        res.status(200).send({message : "Se elimino Correctamente"})
    }) 
});




module.exports = router;
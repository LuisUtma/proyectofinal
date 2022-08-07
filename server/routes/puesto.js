const mongoose = require("mongoose")
const { request } = require("express");
const express = require("express");
const { response } = require(".");

const { db } = require('../models/puesto.models');
const PuestoModels = require('../models/puesto.models');
const puestoModels = require("../models/puesto.models");


const router = express.Router();



//METODO POST CON BODY PARSER
router.post('/', (req, response) => {

  
    const puesto = new PuestoModels(req.body);
    puesto.save()
    .then((puestoRegistrado) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                puesto: puestoRegistrado
            }
        });
        
    })
    .catch((err) => {
        return response.status(400).json({
            msg:"Error al registrar el puesto",
            status: 400,
            cont: {
                error: err
            }
        });
    });

});

router.get("/:id", (req, res) => {
 let id = req.params.id
 PuestoModels.findById(id, (err, PuestoModels)=>{
    if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
    if (!PuestoModels) return res.status(404).send({message: 'El puesto no existe'})

    res.status(200).send({PuestoModels})
}) 
});


router.get("/", (request, response) => {
   
   
     const registro =  PuestoModels.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto  exitosamente",
            status: 200, 
            cont: {
                 registro
               
            }
        });

    })
    .catch((err) => {
            return response.status(500).json({
                msg:"Error al consultar los datos de los puesto.",
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
   PuestoModels.findByIdAndUpdate(id,update,(err, puestoupdated)=>{
        if (err) res.status(500).send({message:'Error la Actualizar el puesto: $'})
        res.status(200).send({PuestoModels: puestoupdated})
    }) 
});


router.delete('/:id', (req, res) => {
    let id = req.params.id
    PuestoModels.findByIdAndDelete(id, (err, PuestoModels)=>{
        if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
        if (!PuestoModels) return res.status(404).send({message: 'El puesto no existe'})
    
        res.status(200).send({message : "Se elimino Correctamente"})
    }) 
});






module.exports = router; 
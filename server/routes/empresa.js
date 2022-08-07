

const mongoose = require("mongoose")
const { request } = require("express");
const express = require("express");
const { response } = require(".");

const { db } = require('../models/Empresa.models');
const EmpresaModels = require('../models/Empresa.models');


const router = express.Router();



router.post('/', (req, response) => {


    const empresa = new EmpresaModels(req.body);
    empresa.save()
    .then((EmpresaRegistrada) => {
       return response.status(200).json({
            msg:"Se ha registrado correctamente",
            status: 200,
            cont: {
                usuario: EmpresaRegistrada
            }
        });
        
    })
    .catch((err) => {
        return response.status(400).json({
            msg:"Error al registrar la Empresa",
            status: 400,
            cont: {
                error: err
            }
        });
    });

});

router.get("/:id", (req, res) => {
 let id = req.params.id
 EmpresaModels.findById(id, (err, EmpresaModels)=>{
    if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
    if (!EmpresaModels) return res.status(404).send({message: 'La Empresa no existe'})

    res.status(200).send({EmpresaModels})
}) 
});


router.get("/", (request, response) => {
   
   
     const registro =  EmpresaModels.find().exec()
    .then((registro) => {
        return response.status(200).json({
            msg:"Se consulto el registro exitosamente",
            status: 200, 
            cont: {
                 registro
               
            }
        });

    })
    .catch((err) => {
            return response.status(500).json({
                msg:"Error al consultar los datos de las Empresas.",
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
    EmpresaModels.findByIdAndUpdate(id,update,(err, empresaupdated)=>{
        if (err) res.status(500).send({message:'Error la Actualizar la Empresa: $'})
        res.status(200).send({EmpresaModels: empresaupdated})
    }) 
});


router.delete('/:id', (req, res) => {
    let id = req.params.id
    EmpresaModels.findByIdAndDelete(id, (err, EmpresaModels)=>{
        if (err) return res.status(500).send({message:'Error la realizar la peticion: $'})
        if (!EmpresaModels) return res.status(404).send({message: 'La Empresa no existe'})
    
        res.status(200).send({message : "Se elimino Correctamente"})
    }) 
});




module.exports = router;


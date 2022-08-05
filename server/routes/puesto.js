const mongoose = require("mongoose")
const { request } = require("express");
const express = require("express");
const { response } = require(".");

const { db } = require('../models/puesto.models');
const PuestoModels = require('../models/puesto.models');


const router = express.Router();
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
    
    }

//muestra todos los datos en el sistema de usuarios, osea todas las colecciones existentes
router.get("/get", (request, response) => {

    
    PuestoModels.find()
    .then((Puesto) => {
return response.status(200).json({
 msg: "Se consultaron los puestos exitosamente",
 status: 200,
 cont: {
    Puesto
 }   
});
    })
    .catch(() =>{
        return response.status(500).json({
            msg:"Error al consultar datos",
            status:500,
            const:{
                error:err
            }
        });

    
    });
});

//muestra solo los datos del id como parametro obligatorio
router.get("/Busquedaid/:id", (request, response) => {
    const{id} = request.params;

    
    PuestoModels.findOne()
    .then((Puesto) => {
return response.status(200).json({
 msg: "Se consulto el puesto correctamente",
 id,
 status: 200,
 cont: {
    Puesto
 }   
});
    })
    .catch(() =>{
        return response.status(500).json({
            msg:"Error al consultar datos",
            status:500,
            const:{
                error:err
            }
        });

    
    });
});

router.post("/", (request, response) => {
    

    const Puesto = new PuestoModels(request.body);

    console.log(Puesto);

    Puesto.save()
    .then((PuestoRegistrado) => {
        response.status(500).json({
            msg:"Puesto registrado exitosamente",
            status:500,
            cont:{
                Puesto: PuestoRegistrado
            }
        });
    })
    .catch((err) => {
        return response.status(500).json({
            msg:"Error de registro",
            status:500,
            const:{
                error:err
            }
        });
    });

});



router.put("/", (req, res) =>{
    const{id} = req.params
    const body = req.body
PuestoModels.updateOne(
    {id: parseId(req.params.id)},
    body,
(err, docs)=> {
    res.send({
        items: docs
    })
}
)

});

router.delete("/", (req, res) =>{
    const{id} = req.params
    const body = req.body
PuestoModels.deleteOne(
    {id: parseId(req.params.id)},
    body,
(err, docs)=> {
    res.send({
        items: docs
    })
}
)

});






module.exports = router; 
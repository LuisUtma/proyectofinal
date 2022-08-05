const mongoose = require("mongoose")
const { request } = require("express");
const express = require("express");
const { response } = require(".");

const { db } = require('../models/Empresa.models');
const EmpresaModels = require('../models/Empresa.models');


const router = express.Router();
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
    
    }

//muestra todos los datos en el sistema de usuarios, osea todas las colecciones existentes
router.get("/get", (request, response) => {

    
    EmpresaModels.find()
    .then((Empresa) => {
return response.status(200).json({
 msg: "Se consultaron las empresas exitosamente",
 status: 200,
 cont: {
    Empresa
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

    
    EmpresaModels.findOne()
    .then((Empresa) => {
return response.status(200).json({
 msg: "Se consulto la Empresa correctamente",
 id,
 status: 200,
 cont: {
    Empresa
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
    

    const Empresa = new EmpresaModels(request.body);

    console.log(Empresa);

    Empresa.save()
    .then((EmpresaRegistrada) => {
        response.status(500).json({
            msg:"Empresa registrada exitosamente",
            status:500,
            cont:{
                Empresa: EmpresaRegistrada
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
EmpresaModels.updateOne(
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
EmpresaModels.deleteOne(
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
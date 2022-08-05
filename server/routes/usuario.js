const bcrypt = require('bcrypt');
const { request } = require("express");
const express = require("express");
const { response } = require(".");

const { db } = require('../models/Usuario.models');
const UsuarioModels = require('../models/Usuario.models');
const Email = require("../libraries/Email");

const router = express.Router();
const parseId = (id) => {
    return mongoose.Types.ObjectId(id)
    
    }

//muestra todos los datos en el sistema de usuarios, osea todas las colecciones existentes
router.get("/get", (request, response) => {

    
    UsuarioModels.find()
    .then((usuarios) => {
return response.status(200).json({
 msg: "Se consultaron los usuarios exitosamente",
 status: 200,
 cont: {
    usuarios
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

    
    UsuarioModels.findOne()
    .then((usuarios) => {
return response.status(200).json({
 msg: "Se consulto el usuario correctamente",
 id,
 status: 200,
 cont: {
    usuarios
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
    

    const Usuario = new UsuarioModels(request.body);

    console.log(Usuario);

    Puesto.save()
    .then((UsuarioRegistrado) => {
        response.status(500).json({
            msg:"Puesto registrado exitosamente",
            status:500,
            cont:{
                Usuario: UsuarioRegistrado
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
UsuarioModels.updateOne(
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
UsuarioModels.deleteOne(
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
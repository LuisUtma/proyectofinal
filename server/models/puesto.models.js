const mongoose = require("mongoose");


const PuestoSchema = mongoose.Schema({
    strnombre:{
        type:String,
        required: [true, "Es necesario ingresar el Nombre de tu puesto"]
    },
    idEmpresa:{
        type:mongoose.Types.ObjectId,
        required: [true, "Es necesario ingresar la id de empresa"]
    },
  
    

   
  
});


module.exports = mongoose.model("puesto", PuestoSchema);
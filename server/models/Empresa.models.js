const mongoose = require("mongoose");


const EmpresaSchema = mongoose.Schema({
    strnombre:{
        type:String,
        required: [true, "Es necesario ingresar el Nombre de tu empresa"]
    },
    strRazonSocial:{
        type:String,
        required: [true, "Es necesario ingresar la Razon Social"]
    },
  
    

   
  
});


module.exports = mongoose.model("empresa", EmpresaSchema);
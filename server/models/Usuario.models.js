const mongoose = require("mongoose");



const UsuarioSchema = mongoose.Schema({
    strnombre:{
        type:String,
        required: [true, "Es necesario ingresar tu Nombre"]
    },
    strPrimeApellidos:{
        type:String,
        required: [true, "Es necesario ingresar los apellidos"]
    },
    strSegundoApellidos:{
        type:String,
        required: [true, "Es necesario ingresar los apellidos"]
    },
    nmbEdad:{
        type:String,
        required: [true, "Es necesario ingresar la edad"]
    },
    idPuesto:{
        type:mongoose.Types.ObjectId,
        required: [true, "Es necesario ingresar el id"]
    },

    credenciales: {

        strCorreo: {

            type:String,
            required:[true,"es necesario el correo"]
        },
        stsPassword:{ type: String,
        required:[true, " es necesario la contraseña"]
        }
          

    }
  
});
    


    module.exports = mongoose.model("usuario", UsuarioSchema);
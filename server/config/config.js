//variables de entorno

//configuracion del puerto 

process.env.PORT = process.env.PORT || 3000;

//entorno

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//configuracion de la base de datos

if (process.env.NODE_ENV === "dev") {
    process.env.URLDB = "mongodb+srv://user5a:GF8TaI1UH6ZsyUWr@cluster0.slgur.mongodb.net/utm19020134?retryWrites=true&w=majority";
} else {
    process.env.URLDB = "mongodb+srv://user5a:GF8TaI1UH6ZsyUWr@cluster0.slgur.mongodb.net/utm19020134?retryWrites=true&w=majority";
}
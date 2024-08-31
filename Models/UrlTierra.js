const mongoose = require("mongoose");
const { Schema } = mongoose;

const tierraSchema = new Schema({
    titulo: {
        type: String,
        required: true  // Asegúrate de usar "required" en lugar de "require"
    },
    contenido: {
        type: String,
        required: false
    },
    usuario: {
        type: String,
        required: true
    }
});

const UrlTierra = mongoose.model("Tierra", tierraSchema);
module.exports = UrlTierra;  // Exporta correctamente el modelo

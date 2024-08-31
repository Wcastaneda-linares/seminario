const mongoose = require("mongoose");
const { Schema } = mongoose;

const pesticidaSchema = new Schema({
    titulo: {
        type: String,
        required: true
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

const UrlPesticidas = mongoose.model("Pesticida", pesticidaSchema);
module.exports = UrlPesticidas;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const riegoSchema = new Schema({
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

const UrlRiegos = mongoose.model("Riego", riegoSchema);
module.exports = UrlRiegos;

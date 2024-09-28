const mongoose = require("mongoose");
const { Schema } = mongoose;

const abonoSchema = new Schema({
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

const UrlAbonos = mongoose.model("Abono", abonoSchema);
module.exports = UrlAbonos;

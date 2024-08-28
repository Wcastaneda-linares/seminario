const mongoose = require('mongoose');

// Cargar variables de entorno desde un archivo .env
require('dotenv').config();

// Conexión a la base de datos, utilizando la URL proporcionada y una contraseña segura desde las variables de entorno
const mongoURL = process.env.MONGO_URL || "mongodb+srv://sergio:soy12345@cluster0.lfbhnkz.mongodb.net/plantacion";
// Conectarse a la base de datos
mongoose.connect(mongoURL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('connection error:', error);
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected and ready😍');
});

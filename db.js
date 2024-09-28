const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
require('dotenv').config();  // Cargar variables de entorno

<<<<<<< HEAD
// Configuración de MySQL
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",  // Coloca tu contraseña de MySQL
    database: "pruebasyactividades",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
=======
// Cargar variables de entorno desde un archivo .env
require('dotenv').config();

// Conexión a la base de datos, utilizando la URL proporcionada y una contraseña segura desde las variables de entorno
const mongoURL = process.env.MONGO_URL || "mongodb+srv://cfernando35:@cluster0.oyb4k85.mongodb.net/";
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
>>>>>>> b08051884faac0f40bfb7c018549e0b315ba2123
});

// Configuración de MongoDB usando la URL desde variables de entorno
const mongoURL = process.env.MONGO_URL || "mongodb+srv://sergio:soy12345@cluster0.lfbhnkz.mongodb.net/plantacion";

// Función para verificar la conexión a MySQL
async function checkMySQLConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Conexión a MySQL exitosa");
        connection.release(); // Liberar la conexión cuando termines
        return true;
    } catch (error) {
        console.error("Error al conectar a MySQL:", error);
        return false;
    }
}

// Función para verificar la conexión a MongoDB
async function checkMongoConnection() {
    try {
        await mongoose.connect(mongoURL);
        console.log("Conexión a MongoDB exitosa");
        return true;
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        return false;
    }
}

// Función para manejar ambas conexiones
async function checkConnections() {
    const isMySQLConnected = await checkMySQLConnection();
    const isMongoConnected = await checkMongoConnection();

    if (isMySQLConnected && isMongoConnected) {
        console.log("Ambas conexiones a MySQL y MongoDB fueron exitosas 😍");
    } else {
        console.error("Hubo un problema con una o ambas conexiones.");
    }
}

// Llamar la función para verificar las conexiones
checkConnections();

module.exports = pool;
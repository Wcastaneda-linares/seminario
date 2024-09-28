const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
require('dotenv').config();  // Cargar variables de entorno

// Configuración de MySQL
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",  // Coloca tu contraseña de MySQL
    database: "pruebasyactividades",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
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
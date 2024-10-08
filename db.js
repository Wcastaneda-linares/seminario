<<<<<<< HEAD
const mongoose = require("mongoose");
const sql = require("mssql");
require('dotenv').config(); // Cargar variables de entorno

// Configuración de SQL Server usando variables de entorno
const sqlConfig = {
    user: process.env.SQL_USER || "SeminarioMaster_SQLLogin_2",
    password: process.env.SQL_PASSWORD || "varkmfk659",
    database: process.env.SQL_DATABASE || "actividadesagricultores",
    server: process.env.SQL_SERVER || "actividadesagricultores.mssql.somee.com",
    options: {
        encrypt: true, // Si usas SSL
        trustServerCertificate: true, // Permitir certificados no válidos
        packetSize: 4096
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

// Función para crear y manejar el pool de conexiones de SQL Server
let sqlPool; // Declarar la variable del pool

async function connectSQLServer() {
    if (!sqlPool) { // Crear la conexión si no existe
        try {
            sqlPool = await new sql.ConnectionPool(sqlConfig).connect();
            console.log("Conexión a SQL Server exitosa");
            return sqlPool;
        } catch (error) {
            console.error("Error al conectar a SQL Server:", error);
            throw error; // Lanza el error para que pueda ser manejado más adelante
        }
    }
    return sqlPool; // Si ya está conectado, retorna la misma conexión
}

// Configuración de MongoDB usando la URL desde variables de entorno
const mongoURL = process.env.MONGO_URL || "mongodb+srv://sergio:soy12345@cluster0.lfbhnkz.mongodb.net/plantacion";
=======
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
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba

// Función para verificar la conexión a MongoDB
async function connectMongoDB() {
    try {
        await mongoose.connect(mongoURL);
        console.log("Conexión a MongoDB exitosa");
        return true;
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        throw error; // Lanza el error para que pueda ser manejado más adelante
    }
}

<<<<<<< HEAD
// Función para manejar ambas conexiones
async function checkConnections() {
    try {
        await connectSQLServer(); // Conectar a SQL Server
        await connectMongoDB();   // Conectar a MongoDB
        console.log("Conexión a SQL Server y MongoDB exitosa 😍");
    } catch (error) {
        console.error("Hubo un problema con una o ambas conexiones.", error);
    }
}

// Llamar la función para verificar las conexiones al iniciar la aplicación
checkConnections();

// Exportar el pool de SQL Server para reutilizar en el resto de la aplicación
module.exports = {
    sqlPool: connectSQLServer
};
=======
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
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba

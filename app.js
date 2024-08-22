
// app.js
const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import mongoose
const app = express(); // Create an Express app instance
const port = 6001;
const { create } = require("express-handlebars");

require('./db'); // Conexión a la base de datos

// Configuración de Handlebars
const hbs = create({
    extname: 'hbs',
    partialsDir: ['views/components'] // Asegúrate de que la ruta sea correcta
});

// Configuración del motor de vistas
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views'); // Asegúrate de que la carpeta "views" exista y esté en la raíz del proyecto
app.use(express.static(__dirname + "/public"))
// Importación y uso de rutas
app.use('/', require('./Routes/simpleRoutes'));  // Asegúrate de que la ruta al archivo sea correcta
app.use('/auth', require('./Routes/auth'));


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
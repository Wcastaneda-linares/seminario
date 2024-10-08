const express = require('express');
const mongoose = require('mongoose');
const { create } = require('express-handlebars');
const handlebarsLayouts = require('handlebars-layouts');
const app = express();
const port = 6001;

require('./db'); // Conexión a la base de datos

// Configuración de Handlebars
const hbs = create({
    extname: 'hbs',
    partialsDir: ['views/components'],
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
});

// Registrar handlebars-layouts
hbs.handlebars.registerHelper(handlebarsLayouts(hbs.handlebars));

// Configuración del motor de vistas
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Middleware para servir archivos estáticos
app.use(express.static(__dirname + '/public'));


// Importar rutas
const simpleRoutes = require('./Routes/simpleRoutes');
const authRoutes = require('./Routes/auth');
app.use('/', simpleRoutes);
app.use('/auth', authRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
require('dotenv').config();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const { create } = require('express-handlebars');
const handlebarsLayouts = require('handlebars-layouts');
const app = express();
const port = 6001;
require('./middleware/Passport')
const session = require('express-session');
require('./db');
const flash = require('connect-flash');
app.use(flash());

app.use(session({
    secret: process.env.JWT_SECRET, // Cambia esto por una cadena secreta más segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Para pasar los mensajes flash a las vistas
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

-
app.use(passport.initialize());
app.use(passport.session());
 // Conexión a la base de datos
app.use(cookieParser()); // Habilita el manejo de cookies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Middlewares para parsear el cuerpo de las solicitudes

//const authRoutes = require('./Routes/auth');
const simpleRoutes = require('./Routes/simpleRoutes');
app.use('/', simpleRoutes);



// Importar y usar rutas

// Middleware para servir archivos estáticos
app.use(express.static(__dirname + '/public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
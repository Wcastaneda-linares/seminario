const express = require('express');
require('dotenv').config();
const passport = require('passport');
const cookieParser = require('cookie-parser');
<<<<<<< HEAD
const bodyParser = require('body-parser');
=======
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
const { create } = require('express-handlebars');
const handlebarsLayouts = require('handlebars-layouts');
const app = express();
const port = 6001;
<<<<<<< HEAD
require('./middleware/Passport');
=======
require('./middleware/Passport')
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
const session = require('express-session');
require('./db');
const flash = require('connect-flash');
app.use(flash());

app.use(session({
<<<<<<< HEAD
    secret: process.env.JWT_SECRET||"52D5FA11-9E49-49D4-A0FD-394E0D0FE98E", // Cambia esto por una cadena secreta más segura
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Para pasar los mensajes flash a las vistas
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

app.use(passport.initialize());
app.use(passport.session());

// Conexión a la base de datos
app.use(cookieParser()); // Habilita el manejo de cookies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
=======
    secret: process.env.JWT_SECRET, // Cambia esto por una cadena secreta más segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba

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
    helpers: {
        // Register a helper to access the first image
        first: function(context) {
            return context[0];
          }
    }
});

// Registrar handlebars-layouts
hbs.handlebars.registerHelper(handlebarsLayouts(hbs.handlebars));

// Configuración del motor de vistas
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Middlewares para parsear el cuerpo de las solicitudes
<<<<<<< HEAD

//const authRoutes = require('./Routes/auth');
const simpleRoutes = require('./Routes/simpleRoutes');
app.use('/', simpleRoutes);
=======

//const authRoutes = require('./Routes/auth');
const simpleRoutes = require('./Routes/simpleRoutes');
app.use('/', simpleRoutes);



// Importar y usar rutas
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba

// Middleware para servir archivos estáticos
app.use(express.static(__dirname + '/public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
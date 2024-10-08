const express = require("express");
const {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
>>>>>>> ae07c1f16097f2dd8f4e085f4348731062b7cd51
    agricultores,
    publicAgricultores,
    insertarUsuarios,
    register,
    crearPost,
    leerForos,
    agregarRespuesta,
    sesiones,
    cerrarsesion,
    agregarPost,
    leerPublicaciones,
} = require("../Controllers/HomeControllers");
const{ verificarToken } = require("../middleware/autenticacion");
const passport=require('../middleware/Passport')
<<<<<<< HEAD


const router = express.Router();

=======
<<<<<<< HEAD


const router = express.Router();

=======


const router = express.Router();

>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
>>>>>>> ae07c1f16097f2dd8f4e085f4348731062b7cd51
router.post('/home',verificarToken,agregarPost)
// Otras rutas que usan el token
router.get("/agricultores", verificarToken, agricultores);
router.post("/agricultores", verificarToken, publicAgricultores);
router.get('/logout',cerrarsesion)
// Para rutas que no requieren token
router.get("/",(req,res)=>{    
    res.render("login");
});
router.post("/login",sesiones);
router.get("/register", register);
router.post("/register", insertarUsuarios);
// Ruta para crear una nueva pregunta
router.post("/foros", crearPost);
router.get("/foros", leerForos);
// Ruta para agregar una respuesta a una pregunta existente
router.post("/foros/:id/respuestas", agregarRespuesta);
router.get('/home', verificarToken, async (req, res) => {
<<<<<<< HEAD
   
    try {
        const publicaciones = await leerPublicaciones();

        // Mapear las publicaciones para obtener las rutas de las imágenes
        const publicacionesConImagenes = publicaciones.map(publicacion => {
            const { _id, name, Imagen = [] } = publicacion; // Default a un array vacío si 'imagenes' no existe

            // Verificamos si imagenes es un arreglo antes de hacer el map
            const rutasImagenes = Array.isArray(Imagen) ? Imagen.map(imagen => {
                return `/Perfiles/fotodinamica/${imagen}`;
            }) : [];

            // Agregar una propiedad para indicar si hay múltiples imágenes
            const tieneMultiplesImagenes = rutasImagenes.length > 1;

            return { _id, name, imagenes: rutasImagenes, tieneMultiplesImagenes };
        });

        // Renderizar la vista 'home' pasando las publicaciones con imágenes
        return res.render('home', { publicaciones: publicacionesConImagenes },
            console.log(publicacionesConImagenes)
        );
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        return res.status(500).render('error', { message: 'Error al obtener publicaciones' });
    }
});



=======
<<<<<<< HEAD
   
    try {
        const publicaciones = await leerPublicaciones();
>>>>>>> ae07c1f16097f2dd8f4e085f4348731062b7cd51

        // Mapear las publicaciones para obtener las rutas de las imágenes
        const publicacionesConImagenes = publicaciones.map(publicacion => {
            const { _id, name, Imagen = [] } = publicacion; // Default a un array vacío si 'imagenes' no existe

            // Verificamos si imagenes es un arreglo antes de hacer el map
            const rutasImagenes = Array.isArray(Imagen) ? Imagen.map(imagen => {
                return `/Perfiles/fotodinamica/${imagen}`;
            }) : [];

            // Agregar una propiedad para indicar si hay múltiples imágenes
            const tieneMultiplesImagenes = rutasImagenes.length > 1;

            return { _id, name, imagenes: rutasImagenes, tieneMultiplesImagenes };
        });

        // Renderizar la vista 'home' pasando las publicaciones con imágenes
        return res.render('home', { publicaciones: publicacionesConImagenes },
            console.log(publicacionesConImagenes)
        );
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        return res.status(500).render('error', { message: 'Error al obtener publicaciones' });
    }
});



=======
    try {
        const publics = await leerPublicaciones(); // Llama a leerPublicaciones para obtener datos
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba

        // Renderiza la vista pasando los datos necesarios
        return res.render("home", {
            username: req.user.username,
            email: req.user.email,
            publics // Pasa las publicaciones a la vista
        });
    } catch (error) {
        console.error(error);
        req.flash("mensajes", [{ msg: "Error al cargar las publicaciones." }]);
        return res.redirect("/"); // Redirige en caso de error
    }
});

=======
    leerurltierras,
    publicartierras,
    leerurlriegos,
    publicarriegos,
    leerurlpesticidas,
    publicarpesticidas,
    leerurlabonos,
    publicarabonos,
    login
} = require("../Controllers/HomeControllers");

const router = express.Router();
router.get("/", (req, res) => res.render("home"));
router.get("/login", login);
router.get("/tierras", leerurltierras);
router.post("/tierras", publicartierras);
router.get("/riegos", leerurlriegos);
router.post("/riegos", publicarriegos);
router.get("/pesticidas", leerurlpesticidas);
router.post("/pesticidas", publicarpesticidas);
router.get("/abonos", leerurlabonos);
router.post("/abonos", publicarabonos);
>>>>>>> b08051884faac0f40bfb7c018549e0b315ba2123

module.exports = router;


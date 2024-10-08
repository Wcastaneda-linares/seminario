const express = require("express");
const {
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


const router = express.Router();

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





module.exports = router;

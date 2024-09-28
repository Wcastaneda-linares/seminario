const express = require("express");
const {
<<<<<<< HEAD
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
        const publics = await leerPublicaciones(); // Llama a leerPublicaciones para obtener datos

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


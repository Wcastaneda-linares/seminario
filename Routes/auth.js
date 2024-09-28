const express = require("express");
const {
    leerurltierras,
    leerurlriegos,
    leerurlpesticidas,
<<<<<<< HEAD
    leerurlabonos,
    leerForos
=======
    leerurlabonos
>>>>>>> b08051884faac0f40bfb7c018549e0b315ba2123
} = require("../Controllers/HomeControllers");

const router = express.Router();

router.get("/tierras", leerurltierras);
router.get("/riegos", leerurlriegos);
router.get("/pesticidas", leerurlpesticidas);
router.get("/plagas", (req, res) => res.render("plagas"));
router.get("/abonos", leerurlabonos);
<<<<<<< HEAD
router.get("/foros", leerForos);
=======
>>>>>>> b08051884faac0f40bfb7c018549e0b315ba2123
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => res.redirect("/auth/login"));
router.get("/reset-password", (req, res) => res.render("reset-password"));
router.post("/reset-password", (req, res) => res.redirect("/auth/login"));

module.exports = router;


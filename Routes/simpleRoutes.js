const express = require("express");
const {
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

module.exports = router;


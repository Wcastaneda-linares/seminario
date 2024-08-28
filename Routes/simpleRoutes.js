// simpleRoutes.js
const express = require("express");
const router = express.Router();
//const { listados } = require("./auth");

const { urlTierras, publicartierras } = require("../Controllers/HomeControllers");
const {login, leerurltierras } = require("../Controllers/HomeControllers");
router.get("/", (req, res) => {
    res.render("home")
});
router.get('/login',login)
router.get('/tierras',leerurltierras)
router.post('/tierras',publicartierras)
router.get('/riegos', (req, res) => {
    res.render('riegos')
})
router.get('/pesticidas', (req, res) => {
    res.render('Pesticidas')
})
router.get('/plagas', (req, res) => {
    res.render('plagas')
})
router.get('/abonos', (req, res) => {
    res.render('abonos')
})


module.exports = router;

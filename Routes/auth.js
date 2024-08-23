const express = require("express");
const router = express.Router();

router.get("/tierras", (req, res) => {
  res.render("Tierras");
});
router.get("/riegos", (req, res) => {
  res.render("riegos");
});
router.get("/pesticidas", (req, res) => {
  res.render("Pesticidas");
});
router.get("/plagas", (req, res) => {
  res.render("plagas");
});
router.get("/abonos", (req, res) => {
  res.render("abonos");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  res.redirect("/auth/login");
});

router.get("/reset-password", (req, res) => {
  res.render("reset-password");
});

router.post("/reset-password", (req, res) => {
  res.redirect("/auth/login");
});

module.exports = router;

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("Usuario autenticado");
        return next();   
    } else {
        console.log("Usuario no autenticado, redirigiendo a /");
        res.redirect('/');  
    }
};

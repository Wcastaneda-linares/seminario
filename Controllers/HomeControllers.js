const UrlTierra = require("../Models/UrlTierra");  // Asegúrate de que la ruta esté correcta
const UrlRiegos = require("../Models/UrlRiegos");
const UrlPesticidas = require("../Models/UrlPesticidas");
const UrlAbonos = require("../Models/UrlAbonos");

const leerurltierras = async (req, res) => {
    try {
        const urltierra = await UrlTierra.find().lean();  // Utiliza el método "find" en el modelo correctamente importado
        console.log(urltierra)
        res.render("Tierras", { urltierra:urltierra });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al obtener las tierras.");  // Opcional: enviar una respuesta de error al cliente
    }
};
const publicartierras = async (req, res) => {
   const { titulo, contenido, usuario } = req.body;  // Ahora req.body debería estar definido
    try {
      const urltierra = new UrlTierra({ titulo, contenido, usuario });
        console.log(urltierra);
        await urltierra.save();
    
        res.redirect("Tierras");
    } catch (error) {
       
    }
}
// Riegos
const leerurlriegos = async (req, res) => {
    try {
        const urlriegos = await UrlRiegos.find().lean();
        res.render("riegos", { urlriegos: urlriegos });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al obtener los riegos.");
    }
};

const publicarriegos = async (req, res) => {
    const { titulo, contenido, usuario } = req.body;
    try {
        const urlriego = new UrlRiegos({ titulo, contenido, usuario });
        await urlriego.save();
        res.redirect("riegos");
    } catch (error) {
        console.log(error);
    }
};

// Pesticidas
const leerurlpesticidas = async (req, res) => {
    try {
        const urlpesticidas = await UrlPesticidas.find().lean();
        res.render("Pesticidas", { urlpesticidas: urlpesticidas });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al obtener los pesticidas.");
    }
};

const publicarpesticidas = async (req, res) => {
    const { titulo, contenido, usuario } = req.body;
    try {
        const urlpesticida = new UrlPesticidas({ titulo, contenido, usuario });
        await urlpesticida.save();
        res.redirect("Pesticidas");
    } catch (error) {
        console.log(error);
    }
};

// Abonos
const leerurlabonos = async (req, res) => {
    try {
        const urlabonos = await UrlAbonos.find().lean();
        res.render("abonos", { urlabonos: urlabonos });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al obtener los abonos.");
    }
};

const publicarabonos = async (req, res) => {
    const { titulo, contenido, usuario } = req.body;
    try {
        const urlabono = new UrlAbonos({ titulo, contenido, usuario });
        await urlabono.save();
        res.redirect("abonos");
    } catch (error) {
        console.log(error);
    }
};


const urlTierras= async (req,res)=>{
    return res.render("Tierras",{tierras:tierras})
    
}
const urlriegos= async (req,res)=>{
    return res.render("riegos",{riegos:riegos})
}

const urlpesticidas= async (req,res)=>{
    return res.render("Pesticidas",{pesticidas:pesticidas})
}
const urlabonos= async (req,res)=>{
    return res.render("abonos",{abonos:abonos})
}

const login=(req,res)=>{
res.render('login')
}

module.exports={
    urlTierras,
    leerurltierras,
    publicartierras,
    urlriegos,
    leerurlriegos,
    publicarriegos,
    leerurlpesticidas,
    urlpesticidas,
    publicarpesticidas,
    urlabonos,
    leerurlabonos,
    publicarabonos,
    login
}
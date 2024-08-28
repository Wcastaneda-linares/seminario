const UrlTierra = require("../Models/UrlTierra");  // Asegúrate de que la ruta esté correcta

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
   const { titulo, contenido } = req.body;  // Ahora req.body debería estar definido
    try {
      const urltierra = new UrlTierra({ titulo: titulo, contenido: contenido });
        console.log(urltierra);
        await urltierra.save();
    
        res.redirect("Tierras");
    } catch (error) {
       
    }
};
const urlTierras= async (req,res)=>{
    const tierras=[{titulo:"Suelo arcilloso",contenido:": Este suelo tiene partículas muy pequeñas que se compactan fácilmente, lo que hace que retenga agua y nutrientes en exceso. Los suelos arcillosos pueden ser difíciles de trabajar, pero son ideales para cultivos que necesitan mucha agua, como el arroz. Mejorar su drenaje y aireación puede requerir la adición de arena y materia orgánica."},
        {titulo:"Suelo arenoso",contenido:"Compuesto por partículas grandes, los suelos arenosos drenan rápidamente y no retienen bien el agua ni los nutrientes. Son fáciles de trabajar, pero los cultivos pueden necesitar riegos más frecuentes y fertilización adicional. Este tipo de suelo es ideal para plantas que prefieren un drenaje rápido, como cactus y otras suculentas."},
        {titulo:"Suelo limoso",contenido:"Este suelo tiene una textura suave y es rico en nutrientes. Drena mejor que el suelo arcilloso y retiene más agua que el suelo arenoso, lo que lo convierte en un suelo equilibrado ideal para una amplia variedad de cultivos. Los suelos limosos son excelentes para huertos y jardines."},
        {titulo:"Suelo franco",contenido:"Considerado el tipo de suelo más ideal para la agricultura, el suelo franco es una mezcla equilibrada de arena, limo y arcilla. Este tipo de suelo retiene bien los nutrientes y el agua, pero también drena adecuadamente, proporcionando un entorno óptimo para casi todas las plantas."},
        {titulo:"Suelo calcáreo",contenido:"Este suelo es alcalino y tiene un alto contenido de cal. Puede ser pobre en nutrientes y no retiene bien el agua. Los suelos calcáreos son adecuados para cultivos que toleran su pH elevado, como lavanda y algunas variedades de uvas. Es posible mejorar su fertilidad mediante la adición de materia orgánica y la corrección del pH."},
        {titulo:"Suelo orgánico",contenido:": Rico en materia orgánica, como compost y turba, este suelo es muy fértil y retiene bien la humedad. Los suelos orgánicos son ideales para la mayoría de los cultivos hortícolas, ya que proporcionan un ambiente rico en nutrientes y con buena retención de agua."},
        {titulo:"Suelos adecuados para el cultivo de tomate:",contenido:"  "},
        {titulo:"1.	Suelo franco",contenido:": Este es el tipo de suelo más recomendado para el tomate debido a su equilibrio perfecto entre retención de agua, drenaje y contenido de nutrientes. Los suelos francos permiten que las raíces del tomate accedan a los nutrientes necesarios mientras se evita el exceso de agua que podría provocar pudrición de raíces."},
    ];
    return res.render("Tierras",{tierras:tierras})
    
}

const login=(req,res)=>{
res.render('login')
}

module.exports={
    urlTierras,
    leerurltierras,
    publicartierras,
    login,
}
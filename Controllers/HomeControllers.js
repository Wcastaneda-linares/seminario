<<<<<<< HEAD
const path= require('path')
const fs= require('fs')
const sql = require("mssql");
const formidable= require('formidable')
const Foros = require("../Models/Foros");
const User= require('../Models/User.js')
const { sqlPool: poolPromise } =require("../db.js");
=======
<<<<<<< HEAD
const path= require('path')
const fs= require('fs')
const formidable= require('formidable')
const Foros = require("../Models/Foros");
const User= require('../Models/User.js')
const pool =require("../db.js");
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const Publics = require("../Models/Posts.js");
const leertablas = async () => {
    try {
        const [rows] = await pool.query("select * from actividades");
        return rows;
    } catch (error) {
        throw { status: 500, message: "Error al obtener actividades" };
    }
};
const leerPublicaciones = async () => {
    const publics = await Publics.find().lean();
<<<<<<< HEAD
   // console.log(publics); // Aquí puedes ver las publicaciones en la consola
=======
    console.log(publics); // Aquí puedes ver las publicaciones en la consola
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
    return publics; // Solo devuelve el arreglo de publicaciones
};


    const leermispublicaciones= async(req,res)=>{
        try {
            console.log(req.user); // Asegúrate de que req.user esté definido
<<<<<<< HEAD
    
            // Encuentra las publicaciones del usuario
            const urls = await Publics.find({ user:req.user.id}).lean();
            
            console.log(res.json({urls:urls})); // Verifica lo que está retornando la consulta
            
            // Renderiza la vista con las URLs encontradas
           // res.render('profile', { urls: urls });
      } catch (error) {
        req.flash("mensajes",[{msg:error.message}]);
       return res.redirect('/');
      }
    }

    const insertarUsuarios = async (req, res) => {
        const { userName, telefono, email, password } = req.body;
        console.log(req.body);
    
        try {
            // Verificar si el usuario ya existe en MongoDB
            let mongoUser = await User.findOne({ email });
            if (mongoUser) throw new Error("Usuario existente en MongoDB 😒🤷‍♀️");
    
            const pool = await poolPromise(); // Asegúrate de que la conexión esté establecida
            if (!pool) throw new Error('Conexión a SQL Server fallida');
    
            // Verificar si el usuario ya existe en SQL Server
            const existingUsers = await pool.request()
                .input('userName', sql.VarChar, userName) // Declarar el parámetro de entrada correctamente
                .query(`SELECT * FROM usuarios WHERE userName = @userName`);
    
            console.log(existingUsers);
            if (existingUsers.recordset.length > 0) throw new Error("Usuario existente en SQL 😒🤷‍♀️");
    
            // Hashear la contraseña antes de usarla para ambas bases de datos
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Crear nuevo usuario en MongoDB
            let user = new User({ userName, email, telefono, password: hashedPassword });
            await user.save();
            console.log('Usuario registrado en MongoDB');
    
            // Obtener el ID generado en MongoDB
            const mongoId = user._id.toString(); // Convertir ObjectId a string si es necesario
    
            // Insertar el usuario en SQL Server con parámetros para evitar SQL injection
            await pool.request()
                .input('mongoId', sql.VarChar, mongoId)
                .input('userName', sql.VarChar, userName)
                .input('hashedPassword', sql.VarChar, hashedPassword)
                .query(`INSERT INTO usuarios (id_usuario, userName, Passwords) VALUES (@mongoId, @userName, @hashedPassword)`);
    
            console.log('Usuario registrado en SQL Server');
    
            // Redirigir a la página de login si todo fue exitoso
            return res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    };
    
    const sesiones = async (req, res) => {
        const { password, userName } = req.body;
        try {
            let user = null;
    
            // Verificar si el usuario existe en MongoDB (verificando por userName)
            if (userName) {
                user = await User.findOne({ userName });
                if (user) {
                    if (!(await user.comparePassword(password))) throw new Error('Contraseña incorrecta MongoDB');
                }
            }
    
            // Si no es MongoDB, intentar en SQL Server
            if (!user) {
                const pool = await poolPromise(); // Asegúrate de tener la conexión
                if (!pool) throw new Error('Conexión a SQL Server fallida');
    
                const result = await pool.request()
                    .input('userName', sql.VarChar, userName) // Parámetro de entrada
                    .query("SELECT * FROM usuarios WHERE userName = @userName"); // Consulta SQL
    
                const usuarios = result.recordset; // Acceder a los registros devueltos
    
                if (usuarios.length === 0) throw new Error("Usuario incorrecto SQL Server");
    
                const validPassword = await bcrypt.compare(password, usuarios[0].Passwords); // Cambia 'passwords' por el nombre de columna correcto
                if (!validPassword) throw new Error("Contraseña incorrecta SQL Server");
    
                // Guardar el usuario de SQL Server
                user = { userName: usuarios[0].username, email: usuarios[0].email, id: usuarios[0].id_usuario }; // Asegúrate de que los nombres de las columnas sean correctos
            }
    
            // Generar el token JWT con un tiempo de expiración corto (1 hora)
            const token = jwt.sign(
                { username: user.userName || user.userName, email: user.email, id: user.id },
                process.env.JWT_SECRET || '52D5FA11-9E49-49D4-A0FD-394E0D0FE98E', // Asegúrate de usar una clave secreta en variable de entorno
                { expiresIn: '1h' }  // El token expira en 1 hora
            );
    
            // Configuración de la cookie segura
            res.cookie('token', token, {
                httpOnly: true, // Evita el acceso desde JavaScript
                secure: process.env.NODE_ENV === 'production', // Solo marcar como `Secure` en producción (HTTPS)
                sameSite: 'Strict', // Protege contra CSRF
                maxAge: 60 * 60 * 1000 // La cookie expira en 1 hora
            });
    
            // Redirigir a la página de inicio después de la autenticación
            return res.redirect('/home');
        } catch (error) {
            console.log(error.message);
            req.flash("mensajes", [{ msg: error.message }]);
            return res.redirect("/");
        }
    };
    
const agregarPost = async (req, res) => {
    const { titulo } = req.body; // Extraer el título del cuerpo de la solicitud
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                throw new Error("Fallo formidable");
            }

            // Asegúrate de que haya archivos
            const fileKeys = Object.keys(files);
            if (!fileKeys.length) {
                throw new Error('Por favor agrega una imagen o imágenes');
            }

            const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const processedImages = []; // Arreglo para almacenar los nombres de los archivos procesados

            // Procesar múltiples archivos
            for (const key of fileKeys) {
                const fileArray = Array.isArray(files[key]) ? files[key] : [files[key]];

                // Usar un Promise.all para procesar las imágenes de forma concurrente
                const processingPromises = fileArray.map(async (file) => {
                    // Validar si el archivo tiene un nombre original
                    if (!file.originalFilename) {
                        throw new Error('Uno de los archivos no tiene nombre válido');
                    }

                    // Validar el tipo MIME
                    if (!validMimeTypes.includes(file.mimetype.toLowerCase())) {
                        throw new Error(`El archivo ${file.originalFilename} no es un tipo de imagen válido (JPG, JPEG, PNG)`);
                    }

                    // Verificar el tamaño del archivo
                    if (file.size > 5 * 1024 * 1024) {  // 5MB
                        throw new Error(`El archivo ${file.originalFilename} es mayor a 5MB`);
                    }

                    // Obtener la ruta del archivo
                    const dirFile = path.join(__dirname, `/../public/Perfiles/fotodinamica/${file.originalFilename}`);

                    // Asegurarse de que el directorio exista
                    await fs.promises.mkdir(path.dirname(dirFile), { recursive: true });

                    // Mover el archivo usando fs.promises.rename
                    await fs.promises.rename(file.filepath, dirFile);
                    console.log(`Archivo movido a: ${dirFile}`);

                    processedImages.push(file.originalFilename);
                });

                // Esperar a que todas las promesas se resuelvan
                await Promise.all(processingPromises);
            }

            // Imprimir las imágenes procesadas
            console.log("Imágenes procesadas:", processedImages);

            // Guardar las imágenes en MongoDB (o donde sea necesario)
            const publics = new Publics({
                name: "yolo", // Puedes almacenar el título proporcionado
                Imagen: processedImages, // Guardamos el array con las imágenes procesadas
                user: req.user.id // Asegúrate de que el usuario esté autenticado
            });
            await publics.save();

            // Redirigir después de guardar
            return res.redirect('/home');
        } catch (error) {
            console.error(error.message);
            req.flash("mensajes", [{ msg: error.message }]);
            return res.redirect("/home");
        }
    });
};

  
const register =(req, res) =>{
res.render('register')
=======
    
            // Encuentra las publicaciones del usuario
            const urls = await Publics.find({ user:req.user.id}).lean();
            
            console.log(res.json({urls:urls})); // Verifica lo que está retornando la consulta
            
            // Renderiza la vista con las URLs encontradas
           // res.render('profile', { urls: urls });
      } catch (error) {
        req.flash("mensajes",[{msg:error.message}]);
       return res.redirect('/');
      }
    }

const insertarUsuarios = async (req, res) => {
    const { userName, email, password } = req.body;
=======
const UrlTierra = require("../Models/UrlTierra");  // Asegúrate de que la ruta esté correcta
const UrlRiegos = require("../Models/UrlRiegos");
const UrlPesticidas = require("../Models/UrlPesticidas");
const UrlAbonos = require("../Models/UrlAbonos");
>>>>>>> b08051884faac0f40bfb7c018549e0b315ba2123

    try {
        // Verificar si el usuario ya existe en MongoDB
        let mongoUser = await User.findOne({ email });
        if (mongoUser) throw new Error("Usuario existente en MongoDB 😒🤷‍♀️");

        // Verificar si el usuario ya existe en MySQL
        const [existingUsers] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [userName]);
        if (existingUsers.length > 0) throw new Error("Usuario existente en MySQL 😒🤷‍♀️");

        // Hashear la contraseña antes de usarla para ambas bases de datos
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario en MongoDB
        let user = new User({ userName, email, password: hashedPassword });
        await user.save();
        console.log('Usuario registrado en MongoDB');

        // Insertar el usuario en MySQL
        const [usuarios] = await pool.query("INSERT INTO usuarios SET ?", {
            username: userName,
            passwords: hashedPassword, // Usa el mismo hash
            email
        });

        if (!usuarios.affectedRows) {
            throw new Error("Error al crear usuario en MySQL");
        }
        console.log('Usuario registrado en MySQL');

        // Redirigir a la página de login si todo fue exitoso
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
<<<<<<< HEAD


const sesiones = async (req, res) => {
    const { password, userName } = req.body;
    try {
        let user = null;

        // Verificar si el usuario existe en MongoDB (verificando por userName)
        if (userName) {
            user = await User.findOne({ userName });
            if (user) {
                if (!(await user.comparePassword(password))) throw new Error('Contraseña incorrecta MongoDB');
            }
        }

        // Si no es MongoDB, intentar en MySQL
        if (!user) {
            const [usuarios] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [userName]);
            if (usuarios.length === 0) throw new Error("Usuario incorrecto MySQL");

            const validPassword = await bcrypt.compare(password, usuarios[0].passwords);
            if (!validPassword) throw new Error("Contraseña incorrecta MySQL");

            // Guardar el usuario de MySQL
            user = { username: usuarios[0].username, email: usuarios[0].email };
        }

        // Generar el token JWT con un tiempo de expiración corto (1 hora)
        const token = jwt.sign(
            { username: user.userName || user.userName, email: user.email,id: user.id },
            process.env.JWT_SECRET || '52D5FA11-9E49-49D4-A0FD-394E0D0FE98E', // Asegúrate de usar una clave secreta en variable de entorno
            { expiresIn: '1h' }  // El token expira en 1 hora
        );

        // Configuración de la cookie segura
        res.cookie('token', token, {
            httpOnly: true, // Evita el acceso desde JavaScript
            secure: process.env.NODE_ENV === 'production', // Solo marcar como `Secure` en producción (HTTPS)
            sameSite: 'Strict', // Protege contra CSRF
            maxAge: 60 * 60 * 1000 // La cookie expira en 1 hora
        });
        
        // Redirigir a la página de inicio después de la autenticación
        return res.redirect('/home');
=======
const publicartierras = async (req, res) => {
   const { titulo, contenido, usuario } = req.body;  // Ahora req.body debería estar definido
    try {
      const urltierra = new UrlTierra({ titulo, contenido, usuario });
        console.log(urltierra);
        await urltierra.save();
    
        res.redirect("Tierras");
>>>>>>> b08051884faac0f40bfb7c018549e0b315ba2123
    } catch (error) {
        console.log(error.message);
        req.flash("mensajes", [{ msg: error.message }]);
        return res.redirect("/");
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
<<<<<<< HEAD
const agregarPost = async (req, res) => {
    const { titulo } = req.body; // Extraer el título del cuerpo de la solicitud
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) {
                throw new Error("Fallo formidable");
            }

            // Asegúrate de que haya archivos
            const fileKeys = Object.keys(files);
            if (!fileKeys.length) {
                throw new Error('Por favor agrega una imagen o imágenes');
            }

            const validMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const processedImages = []; // Arreglo para almacenar los nombres de los archivos procesados

            // Procesar múltiples archivos
            for (const key of fileKeys) {
                const fileArray = Array.isArray(files[key]) ? files[key] : [files[key]];

                // Usar un Promise.all para procesar las imágenes de forma concurrente
                const processingPromises = fileArray.map(async (file) => {
                    // Validar si el archivo tiene un nombre original
                    if (!file.originalFilename) {
                        throw new Error('Uno de los archivos no tiene nombre válido');
                    }

                    // Validar el tipo MIME
                    if (!validMimeTypes.includes(file.mimetype.toLowerCase())) {
                        throw new Error(`El archivo ${file.originalFilename} no es un tipo de imagen válido (JPG, JPEG, PNG)`);
                    }

                    // Verificar el tamaño del archivo
                    if (file.size > 5 * 1024 * 1024) {  // 5MB
                        throw new Error(`El archivo ${file.originalFilename} es mayor a 5MB`);
                    }

                    // Obtener la ruta del archivo
                    const dirFile = path.join(__dirname, `/../public/Perfiles/fotodinamica/${file.originalFilename}`);

                    // Asegurarse de que el directorio exista
                    await fs.promises.mkdir(path.dirname(dirFile), { recursive: true });

                    // Mover el archivo usando fs.promises.rename
                    await fs.promises.rename(file.filepath, dirFile);
                    console.log(`Archivo movido a: ${dirFile}`);

                    processedImages.push(file.originalFilename);
                });

                // Esperar a que todas las promesas se resuelvan
                await Promise.all(processingPromises);
            }

            // Imprimir las imágenes procesadas
            console.log("Imágenes procesadas:", processedImages);

            // Guardar las imágenes en MongoDB (o donde sea necesario)
            const publics = new Publics({
                name: "yolo", // Puedes almacenar el título proporcionado
                Imagen: processedImages, // Guardamos el array con las imágenes procesadas
                user: req.user.id // Asegúrate de que el usuario esté autenticado
            });
            await publics.save();

            // Redirigir después de guardar
            return res.redirect('/home');
        } catch (error) {
            console.error(error.message);
            req.flash("mensajes", [{ msg: error.message }]);
            return res.redirect("/home");
        }
    });
};

  
const register =(req, res) =>{
res.render('register')
=======

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
    
>>>>>>> b08051884faac0f40bfb7c018549e0b315ba2123
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
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


const home = async (req, res) => {
    const { username = 'Invitado', email = 'no_disponible@example.com' } = req.user || {};

    res.render("home", { username  , email });
};


const home = async (req, res) => {
    const { username = 'Invitado', email = 'no_disponible@example.com' } = req.user || {};

    res.render("home", { username  , email });
};

const login=(req,res)=>{
res.render('login')
}

const agricultores = async (req, res) => {
    try {
        const rows = await leertablas();  // Obtener los datos de la tabla
        res.render('Actividades', { rows });  // Pasar los datos a la vista 'Actividades'
    } catch (error) {
        res.status(500).send(error.message);  // Manejo de errores
    }
};

const publicAgricultores = async (req, res) => {
    const { actividad1, actividad2, actividad3, actividad4 } = req.body;
    try {
        // Realizar la consulta con un array de valores, incluyendo el username del usuario autenticado
        const [result] = await pool.query(
            "INSERT INTO actividades (actividad1, actividad2, actividad3, actividad4, username) VALUES (?, ?, ?, ?, ?)",
            [actividad1, actividad2, actividad3, actividad4, req.user.username]
        );

        // Verificar si la inserción fue exitosa
        if (!result.affectedRows) {
            throw { status: 500, message: "Error al crear las actividades" };
        }

        // Redirigir a la página 'agricultores'
        res.redirect('agricultores');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear las actividades");
    }
};

const leerForos = async (req, res) => {
    try {
        const foros = await Foros.find().lean();
        res.render("foros", { foros });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los posts.");
    }
};

// Crear un nuevo Post
const crearPost = async (req, res) => {
    const { pregunta, contexto} = req.body;
    const usuario = req.user.username;
    
    try {
        const nuevoPost = new Foros({ pregunta, contexto, usuario, fecha: new Date(), respuestas: [] });
        await nuevoPost.save();
        res.redirect("/foros");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error al crear el post.");
    }
};
// Agregar una respuesta a un Post existente
const agregarRespuesta = async (req, res) => {
    const postId = req.params.id;
    const { texto }= req.body;
    const usuario = req.user.username;

    try {
        const foros = await Foros.findById(postId);
        foros.respuestas.push({ texto, usuario, fecha: new Date() });
        await foros.save();
        res.redirect(`/foros/`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar la respuesta.");
    }
};
// En el cliente (JavaScript del frontend)
const cerrarsesion = (req, res) => {
    res.clearCookie('token');  // Eliminar la cookie del token de acceso
    res.clearCookie('refreshToken');  // Eliminar también el refresh token si usas uno
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};


module.exports={
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
    login,
    agricultores,
    publicAgricultores,
    insertarUsuarios,
    register,
    sesiones,home,
    crearPost,
    agregarRespuesta,
    leerForos,
    cerrarsesion,
    agregarPost,
    leerPublicaciones,
    leermispublicaciones,
<<<<<<< HEAD
=======
=======
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
>>>>>>> b08051884faac0f40bfb7c018549e0b315ba2123
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
}
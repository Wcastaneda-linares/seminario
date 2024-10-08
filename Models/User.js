const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ae07c1f16097f2dd8f4e085f4348731062b7cd51
    },
    telefono:{
        type:String,
        required: true
<<<<<<< HEAD
=======
=======
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
>>>>>>> ae07c1f16097f2dd8f4e085f4348731062b7cd51
    }
});

// Middleware para hashear la contraseña antes de guardar


// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña
};

module.exports = mongoose.model('User', userSchema);

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
    },
    telefono:{
        type:String,
        required: true
=======
>>>>>>> f777a61d2bcc15da0bfab0648a118cedd4a599ba
    }
});

// Middleware para hashear la contraseña antes de guardar


// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña
};

module.exports = mongoose.model('User', userSchema);

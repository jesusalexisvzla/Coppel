const mongoose = require('mongoose');

const empleadosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

const loginSchema = new mongoose.Schema({
    token: 
         String,
    
    empleado: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleado",
    }
});

const Empleado = mongoose.model('Empleado', empleadosSchema)
const Login = mongoose.model('Login', loginSchema)

module.exports = {
    Empleado, Login
}
const mongoose = require('mongoose');

const polizasSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    },
    empleado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empleado'
    },
});

const productosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    }
});

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
    poliza: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Poliza'
        }
    ],
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

const Poliza = mongoose.model('Poliza', polizasSchema)
const Producto = mongoose.model('Producto', productosSchema)
const Empleado = mongoose.model('Empleado', empleadosSchema)
const Login = mongoose.model('Login', loginSchema)

module.exports = {
    Poliza, Producto, Empleado, Login
}
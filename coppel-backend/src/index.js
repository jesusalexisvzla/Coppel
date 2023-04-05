const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const empleadosRoutes = require('./routes/empleados')
const productosRoutes = require('./routes/productos')
const polizasRoutes = require('./routes/polizas')
const loginRoutes = require('./routes/login')

const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.removeHeader('x-powered-by');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next();
});
app.use(express.json());
app.use('/api', empleadosRoutes);
app.use('/api', productosRoutes);
app.use('/api', polizasRoutes);
app.use('/api', loginRoutes);

// routes
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

// mongodb connections
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err))

app.listen(port, () => console.log('server listening on port: ', port));
const { query } = require('express');
const express = require('express');
const { Poliza, Producto } = require('../models/polizas');

const router = express.Router();

// create user
router.post('/polizas', (req, res) => {
    const poliza = Poliza(req.body);
    Producto.findById(poliza.producto)
        .then((data) => {
            if (data.quantity < poliza.quantity) {
                res.json({ message: 'Cantidad ingresada es mayor a la del inventario' })
            } else {
                const quantity = data.quantity - poliza.quantity;

                Producto
                    .updateOne({ _id: poliza.producto }, { $set: { quantity }})
                    .then(() => {
                        poliza
                            .save()
                            .then((data) => res.json(data))
                            .catch((err) => res.json({ message: err }))
                    })
                    .catch((err) => res.json({ message: err }))
            }
        })
        .catch((err) => res.json({ message: err }))
});

// get users with query
router.get('/polizas?', (req, res) => { 
    if (req.url.length >= 9) {
        const obj = JSON.parse(decodeURI(req.url.substring(9)))
        const properties = obj.properties;
        const value = obj.value;
        const options = obj.options
        let queryObj = []
    
        for (const propertie of properties) {
            queryObj.push({ [propertie]: options['like'] ? {'$regex': value} : value})
        }
    
        Poliza
            .find({$or: queryObj})
            .populate('producto empleado')
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    } else {
        Poliza
            .find(req.query)
            .populate('producto empleado')
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    }
});

// get user by id
router.get('/polizas/:id', (req, res) => {
    const { id } = req.params;
    Poliza
        .findById(id)
        .populate('producto empleado')
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// update user
router.put('/polizas/:id', (req, res) => {
    const { id } = req.params;
    const { serial, quantity, producto, empleado } = req.body;
    Poliza
        .updateOne({ _id: id }, { $set: { serial, quantity, producto, empleado }})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

router.patch('/polizas/:id', (req, res) => {
    const { id } = req.params;
    const { serial, quantity, producto, empleado } = req.body;
    Poliza
        .updateOne({ _id: id }, { $set: { serial, quantity, producto, empleado }})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// delete user
router.delete('/polizas/:id', (req, res) => {
    const { id } = req.params;
    Poliza
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

module.exports = router;
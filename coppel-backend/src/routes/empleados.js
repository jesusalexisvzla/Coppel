const { query } = require('express');
const express = require('express');
const { Empleado } = require('../models/polizas');

const router = express.Router();

// create user
router.post('/empleados', (req, res) => {
    const empleado = Empleado(req.body);
    empleado
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// get users with query
router.get('/empleados?', (req, res) => { 
    console.log(req.url)
    if (req.url.length >= 11) {
        const obj = JSON.parse(decodeURI(req.url.substring(11)))
        const properties = obj.properties;
        const value = obj.value;
        const options = obj.options
        let queryObj = []
    
        for (const propertie of properties) {
            queryObj.push({ [propertie]: options['like'] ? {'$regex': value} : value})
        }
    
        Empleado
            .find({$or: queryObj})
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    } else {
        Empleado
            .find(req.query)
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    }
});

// get user by id
router.get('/empleados/:id', (req, res) => {
    const { id } = req.params;
    Empleado
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// update user
router.put('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, isActive } = req.body;
    Empleado
        .updateOne({ _id: id }, { $set: {name, email, password, isActive}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

router.patch('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, password, isActive } = req.body;
    Empleado
        .updateOne({ _id: id }, { $set: {name, email, password, isActive}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// delete user
router.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    Empleado
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

module.exports = router;
const { query } = require('express');
const express = require('express');
const { Producto } = require('../models/polizas');

const router = express.Router();

// create user
router.post('/productos', (req, res) => {
    const producto = Producto(req.body);
    producto
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// get users with query
router.get('/productos?', (req, res) => { 
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
    
        Producto
            // .find({$or: [{ name: /alexis/i}, {email: /alexis/i }]})
            .find({$or: queryObj})
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    } else {
        Producto
            .find(req.query)
            .then((data) => res.json(data))
            .catch((err) => res.json({ message: err }))
    }
});

// get user by id
router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    Producto
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// update user
router.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    Producto
        .updateOne({ _id: id }, { $set: {name, quantity}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

router.patch('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    Producto
        .updateOne({ _id: id }, { $set: {name, quantity}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

// delete user
router.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    Producto
        .remove({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

module.exports = router;
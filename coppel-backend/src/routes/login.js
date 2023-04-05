const { query } = require('express');
const express = require('express');
const { Empleado, Login } = require('../models/polizas');

const router = express.Router();

// create login
router.post('/login', (req, res) => {

    const empleado = req.body;
    const email = empleado.email;
    const password = empleado.password;
    
    Empleado.findOne({ email: email, password: password})
        .then((data) => {
            const empleadoId = data._id.toString();
            const newLogin = Login({ empleado: empleadoId, token: 'newTokenTest'})
            Login.find({empleado: data._id})
            .then((data) => {
                    if (!data.length) {
                        console.log('first time login')
                        newLogin
                            .save(function (err, post) {
                                if (err) return next(err)
                                post._doc['empleado'] = { token: newLogin.token, empleadoId: newLogin.empleado }
                                res.json(201, post)
                            })
                    } else {
                        console.log('first delete login')
                        Login
                            .deleteOne({ _id: data._id })
                            .then((data) => {
                                console.log('login after delete')
                                newLogin
                                    .save(function (err, post) {
                                        if (err) return next(err)
                                        post._doc['empleado'] = { token: newLogin.token, empleadoId: newLogin.empleado }
                                        res.json(201, post)
                                    })
                                    
                            })
                            .catch((err) => res.json({ message: err }))
                    }
                })
                .catch((err) => {
                    console.log('asd')
                })
        })
        .catch((err) => res.json({ message: 'empleado or password wrong' }))
});

// get logins
router.get('/login', (req,res) => {
    Login
        .find(req.query)
        .populate('empleado')
        .select('id token empleado')
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

router.get('/login/:token', (req, res) => {
    const { token } = req.params;
    Login
        .findOne({token: token})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
});

module.exports = router;
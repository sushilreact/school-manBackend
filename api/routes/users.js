const express = require('express');
const router = express.Router();
const User = require('../model/users');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { status } = require('express/lib/response');
const saltRounds = 10;

const someOtherPlaintextPassword = 'not_bacon';

router.get('/', (req, res, next) => {
    res.status(200).json({
        messafe: "This is get Request"
    })
})

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                userType: req.body.userType

            })
            user.save()
                .then(result => {
                    console.log("Data submit successfully");
                    console.log(result);
                    res.status(200).json({
                        newUser: result
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
        }
    });


});

router.post('/login', (req, res, next) => {
    console.log(req.body)
    User.find({ username: req.body.username, })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    error: "user Not founded"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        message: "Password not match"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        email: user[0].email,
                        phone: user[0].phone,
                        gender: user[0].gender,
                        userType: user[0].userType
                    },
                        "This is Check token",
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        username: user[0].username,
                        email: user[0].email,
                        phone: user[0].phone,
                        gender: user[0].gender,
                        userType: user[0].userType,
                        token: token
                    })
                }

            })
        })
        .catch(err => {
            res.status(500).json({
                err: err
            })
        })

})





module.exports = router;
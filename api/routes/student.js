const express = require('express');
const router = express.Router();
const Student = require('../model/student');

const checkAuth = require('../midleware/auth');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');


router.get('/', checkAuth, (req, res, next) => {
    Student.find()
        .then(result => {

            res.send(result).status(200);

        })
        .catch(err => {
            console.log(err)
            res.send(err).status(500);

        })
});

router.get('/:id', checkAuth, (req, res, next) => {
    var id = req.params.id
    console.log("MY fde Moku new", id)
    Student.findById(id)
        .then(result => {
            res.send(result).status(200);
        })
        .catch(err => {
            console.log(err)
            res.send(err).status(500);

        })
});




router.post('/', checkAuth, (req, res, next) => {
    const token = req.headers.authorization.replace(/\s+/g, ' ').trim().split('Bearer ')[1];
    const verify = jwt.verify(token, 'This is Check token');
    const enteradmin = verify.username;
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        fathername: req.body.fathername,
        mothername: req.body.mothername,
        name: req.body.name,
        email: req.body.email,
        studentclass: req.body.studentclass,
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender,
        admin: enteradmin


    })
    student.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newStudent: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

router.delete('/:id', checkAuth, async (req, res, next) => {

    try {
        const id = req.params.id

        const deletestudent = await Student.findByIdAndDelete(id)
        if (!req.params.id) {
            res.status(400).send()
        }
        res.send(deletestudent)
    } catch (error) {
        res.status(500).send(error)
    }

});



router.put('/edit/:id', checkAuth, async (req, res, next) => {

    console.log("End Hit data");
    console.log(req.body)
    console.log("Check Types of", typeof (req.params.id))
    try {
        const id = req.params.id
        const updateResult = await Student.findByIdAndUpdate({ _id: id }, req.body)

        return res.status(200).json(updateResult)
    } catch (error) {
        res.status(404).send(error)
    }

})


module.exports = router;
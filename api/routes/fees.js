const express = require('express');
const router = express.Router();
const Fees = require('../model/fees');
const Student = require('../model/student');
const checkAuth = require('../midleware/auth');
const mongoose = require('mongoose');

router.get('/feesshow', checkAuth, (req, res, next) => {
    console.log("Fees Student get Data");
    Student.find()
        .then(result => {
            res.status(200).json({
                StudentResult: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.post('/feessubmit', checkAuth, (req, res, next) => {

    console.log("Fees Student get Data");
    Student.findById("61b8b756e14001801ee7926c", (err, adventure) => {
        if (!adventure) {
            console.log("data record not find");
        }
        else {

            const fee = new Fees({
                _id: new mongoose.Types.ObjectId,
                feeamount: req.body.feeamount,
                studentid: "61b8b756e14001801ee7926c"
            })
            fee.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        newFee: result
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


})


router.post('/feessubmit/:id', checkAuth, (req, res, next) => {
    const reqid = req.params.id;
    console.log("Get byID");
    Student.findById(reqid, (err, adventure) => {
        if (!adventure) {
            console.log("Data not Found", err);
            res.status(500).json({
                error: err
            })
        }
        else {

            const fee = new Fees({
                _id: new mongoose.Types.ObjectId,
                feeamount: req.body.feeamount,
                studentid: reqid
            })
            fee.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        newFee: result
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



})


module.exports = router;
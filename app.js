const express = require('express')
const cors = require('cors')
const app = express()

const studentRoute = require('./api/routes/student');
const feesRoute = require('./api/routes/fees');
const userRoute = require('./api/routes/users');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');




mongoose.connection.on('error', err => {
    console.log("Not Connect yet with mongoDB");
});

mongoose.connection.on('connected', connected => {
    console.log("Database Successfully Coneected");
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use('/student', studentRoute);
app.use('/student/edit', studentRoute);
app.use('/fees', feesRoute);
app.use('/user', userRoute);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Page not found hai'
    })
})

module.exports = app;

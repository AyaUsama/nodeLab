const express = require('express');
const userRouter = require('./routes/userRouter');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dbname', () => {
    console.log('connected to mongodb');
})

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));




app.use('/users', userRouter);


app.listen(3000, () => {
    console.log('started server on port 3000')
})
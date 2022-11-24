const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/dharam-digital-database", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Error')
    } else {
        console.log('MongoDb connected');
    }
})
app.get('/users', (req, res) => {
    console.log('User is connected');
    res.send('User Page');
})

app.listen(process.env.Port || 5002, function() {
    console.log('App Running on Port ' + (process.env.Port || 5002));
});
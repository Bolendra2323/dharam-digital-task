const express = require('express');
const app = express();

const mongoose = require('mongoose');
const DB = 'mongodb+srv://Bolendra:bolendra123@cluster0.gewbbpk.mongodb.net/dharam-digital-data?retryWrites=true&w=majority'

mongoose.connect(DB).then(() => {
    console.log(`Successsfully connected`);
}).catch((err) =>
    console.log('Not connected'));

app.get('/users', (req, res) => {
    console.log('User is connected');
    res.send('User Page');
})

app.listen(process.env.Port || 5002, function() {
    console.log('App Running on Port ' + (process.env.Port || 5002));
});


//mongodb + srv://Bolendra:<password>@cluster0.gewbbpk.mongodb.net/?retryWrites=true&w=majority
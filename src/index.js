const express = require('express');
const app = express();

//In  line no.1  we are requiring the Express module whhich was installed via NPM &  thes line n0.2 sets up the Express application.
//With the help of this application we can use and add functionality to our server.

const bodyParser = require('body-parser');

// Express body-parser is an npm module which is used to process data sent in an HTTP request body.
// Its a kind of global middleware

const mongoose = require('mongoose');

// Here, mongoose will help us to connect with the mongodb database.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DB = 'mongodb+srv://Bolendra:bolendra123@cluster0.gewbbpk.mongodb.net/dharam-digital-data?retryWrites=true&w=majority'

//In line no.19 we are having the  required String which will help us to successfully connect with the data base and this string
//is stored in variable name "DB";

mongoose.connect(DB).then(() => {
    console.log(`Successsfully connected`);
}).catch((err) =>
    console.log('Not connected'));


app.listen(process.env.Port || 5002, function() {
    console.log('App Running on Port ' + (process.env.Port || 5002));
})

//from line no.20 - lint no.21
// The app.listen() function tells the server to start listening for connections on a port no. 5002.
// When the server is  listening to the connection ,the callback is called and we get App Running on Port 5002 in the terminal.
const userModel = require("../models/userscollections");
const validators = require("../validator/validator.js")
const jwt = require('jsonwebtoken');

//const mongoose = require('mongoose');

const login = async function(req, res) {
    try {

        let data = req.body;
        if (!validators.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: 'Data is required' });
        };

        if (!validators.isValidField(data.username)) {
            return res.status(400).send({ status: false, message: 'UserName is missing' });
        };

        if (!validators.isValidField(data.password)) {
            return res.status(400).send({ status: false, message: 'Password is missing' });
        };


        let userName = await userModel.findOne({ username: data.username });

        if (!userName) {
            return res.status(400).send({ status: false, message: 'User is missing' });
        }

        const decryptedPassword = await bcrypt.compare(data.password, userName.password)

        if (!decryptedPassword) {
            return res.status(400).send({ status: false, message: "Password is incorrect" })
        }

        let userId = userName._id

        let token = jwt.sign({ userId: userId }, "Dharam-digital-task", { expiresIn: '1h' })

        res.header("x-api-key", token);
        return res.status(201).send({ status: true, message: "User Login Successfully", userId, token: token })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.login = login;
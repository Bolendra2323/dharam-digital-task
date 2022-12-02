const userscollectionsModel = require("../models/userscollectionsModel");
const validators = require("../validator/validator.js")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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

        // //from line no.12 to line no.22 these are just for validation purpose , i.e, just to cross check
        // //the valid input from the frontend side


        let UserName = await userscollectionsModel.findOne({ username: data.username })

        if (!UserName) {
            return res.status(400).send({ status: false, message: "User Doesn't exist" })
        }

        //In line 28 we are checking the username in the usercollectionsModel , if  username is missing then 
        //that case is handled from line no.34 to lineno.36

        const decryptedPassword = await bcrypt.compare(data.password, UserName.password)

        if (decryptedPassword) {
            return res.status(400).send({ status: false, message: "Password is incorrect" })
        }

        //In line no. 37 we are comparing the password , i.e, the "password" present in the data base and the password 
        //given in the request body of the respective "username"



        let userId = UserName._id

        let token = jwt.sign({ userId: userId }, "Dharam-digital-task", { expiresIn: '10h' })

        res.header("x-api-key", token);
        return res.status(201).send({ status: true, message: "User Login Successfully", userId, token: token })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.login = login;
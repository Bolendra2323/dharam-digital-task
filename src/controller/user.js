const userscollectionsModel = require("../models/userscollectionsModel.js");

const validators = require("../validator/validator.js")

const createUser = async function(req, res) {
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

        //from line no.9 to line no.19 these are just for validation purpose , i.e, just to cross check
        //the valid input from the frontend side


        let userAlreadyExist = await userscollectionsModel.findOne({ username: data.username, password: data.password });

        //Line no. 25 is used for checking the availablity of same username and password, if incase same username and password 
        //is present then it will show the message which is written in line no. 32

        if (userAlreadyExist)

            return res.status(400).send({ status: false, message: "Username and password already present" });

        const createUser = await userscollectionsModel.create(data);

        //line no.34 is used for creating the user data

        let { username, password } = createUser;

        return res.status(201).send({ status: true, data: { username, password } });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.createUser = createUser
const userModel = require("../models/userscollections.js");

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


        let userAlreadyExist = await userModel.findOne({ $or: [{ username: data.username, password: data.password }] });

        if (userAlreadyExist)

            return res.status(400).send({ status: false, message: "Username and password already present" });

        let newUser = await userModel.create(createUser);

        let { username, password } = newUser;

        res.status(201).send({ status: true, data: { username, password } });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.createUser = createUser
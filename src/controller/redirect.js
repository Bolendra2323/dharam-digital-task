const campaignModel = require("../models/campaigncollection");
const validators = require("../validator/validator");

const redirect = async function(req, res) {
    try {

        let shortTokenId = req.params.shortID
        const jwtId = req.shortTokenId
        const data = req.body

    } catch (err) {
        console.log(error);
        return res.status(500).send({ status: false, msg: err.message });
    }
}
const campaignModel = require("../models/campaigncollection");
const validators = require("../validator/validator");

const redirect = async function(req, res) {
    try {

        let shortTokenId = req.params.shortID
        const jwtId = req.shortToken
        const data = req.body

        if (!validators.isValidRequestBody(data)) {

            return res.status(400).send({ status: false, message: "Please provide Data" })

        }

        if (!validators.isValidField(shortTokenId)) {

            return res.status(400).send({ status: false, message: "Provide shortTokenId  in params" })
        }


        if (!jwtId == shortTokenId) {
            return res.status(401).send({ status: false, message: "Unauthorised access" });
        }

        const campaignPresent = await campaignModel.findOne({ _id: shortTokenId, isDeleted: false })

        if (!campaignPresent) {

            return res.status(404).send({ status: false, message: "Campaign Does not exist" })
        }

        if (campaignPresent) {
            return res.status(302).redirect("http://google.com/?click=egwkeuyeurcdkvdi3").send({ status: true, message: "Successfully redirected" })
        }


    } catch (err) {
        console.log(error);
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.redirect = redirect;
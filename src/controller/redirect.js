const axios = require('axios');

//Line no.1 represents we have required the axios module
//axios is basically a promise based http client for the browser and node.js

const campaignModel = require("../models/campaigncollectionModel");
const validators = require("../validator/validator");

const redirect = async function(req, res) {
    try {

        let shortTokenId = req.params.short_token
            // line no.13 represents that in params we will be entering the short token

        const user1 = req.shortTokenId
            // line no.15 reperesnts that in json body we will be inserting the token 

        if (shortTokenId !== user1) {
            return res.status(401).send({ status: false, message: "Unauthorized access! Owner info doesn't match" });
        }


        if (!validators.isValidField(shortTokenId)) {

            return res.status(400).send({ status: false, message: "Provide shortTokenId  in params" })
        }
        // line no.23 to line no. 26 represents the validation part which checks whether token is provided in the params or not

        const campaignPresent = await campaignModel.findById({ _id: shortTokenId, isDeleted: false })

        //line no. 29 represents we are checking the token of the respective user in campaign model.
        //if in case id is not present then we will return the message "camapaign does not exist"

        if (!campaignPresent) {

            return res.status(404).send({ status: false, message: "Campaign Does not exist" })
        }

        let one = "http://google.com/?click=egwkeuyeurcdkvdi3"
        let two = "http://microsoft.com/?msclickid=egwkeuyeurcdkvdi3"

        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {

                const responseOne = responses[0]
                const responseTwo = responses[1]

                let result = axios(responseOne, responseTwo);
                return res.status(301).send({ data: result.data });
            })

        )
    } catch (err) {
        console.log(error);
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.redirect = redirect;
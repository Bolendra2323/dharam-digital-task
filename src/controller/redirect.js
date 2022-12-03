const campaignModel = require("../models/campaigncollectionModel");

const redirectURL = async function(req, res, next) {
    try {

        let shortTokenId = req.params.short_token
        const jwtId = req.shortTokenId


        if (!(shortTokenId === jwtId)) {

            return res.status(401).send({ status: false, message: "UnAuthorised Access" })
        }


        const campaignPresent = await campaignModel.findOne({ _id: _id })

        if (!campaignPresent) {

            return res.status(404).send({ status: false, message: "Campaign Does not exist" })
        }
        if (campaignPresent) {
            var requestCounter = 0;

            // Increment the request counter
            requestCounter++;

            // Check if the request counter is less than or equal to 30
            if (requestCounter <= 30) {
                // Redirect to the first URL
                res.redirect('"http://google.com/?click=egwkeuyeurcdkvdi3');
            } else {
                // Redirect to the second URL
                res.redirect('http://microsoft.com/?msclickid=egwkeuyeurcdkvdi3');
            }


            // const url = ["http://google.com/?click=egwkeuyeurcdkvdi3", "http://microsoft.com/?msclickid=egwkeuyeurcdkvdi3"];
            // const a = Array(30).fill(url[0]);
            // const b = Array(70).fill(url[1]);
            // if (a) {
            //     res.redirect(301, a);
            //     next();
            // } else {
            //     res.redirect(301, b);
            // }

        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.redirectURL = redirectURL;
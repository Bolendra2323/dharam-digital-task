const campaignModel = require("../models/campaigncollectionModel");

const redirectURL = async function(req, res, next) {
    try {

        // let shortTokenId = req.params.short_token
        // const jwtId = req.shortTokenId


        // if (!(shortTokenId === jwtId)) {

        //     return res.status(401).send({ status: false, message: "UnAuthorised Access" })
        // }


        // const campaignPresent = await campaignModel.findOne({ _id: _id })

        // if (!campaignPresent) {

        //     return res.status(404).send({ status: false, message: "Campaign Does not exist" })
        // }
        // if (campaignPresent) {
        //     var requestCounter = 0;

        //     // Increment the request counter
        //     requestCounter++;

        //     // Check if the request counter is less than or equal to 30
        //     if (requestCounter <= 30) {
        //         // Redirect to the first URL
        //         res.redirect('"http://google.com/?click=egwkeuyeurcdkvdi3');
        //     } else {
        //         // Redirect to the second URL
        //         res.redirect('http://microsoft.com/?msclickid=egwkeuyeurcdkvdi3');
        //     }

        const { short_token, click_id } = req.query;

        const campaign = campaignModel.findOne({ short_token });

        if (!campaign || !campaign.enabled) {
            return res.status(404).send({ error: 'Campaign not found or not enabled' });
        }

        // Calculate the total ratio percentage of all offers in the campaign
        const totalRatio = campaign.offers.reduce((acc, offer) => acc + offer.ratio_percentage, 0);

        // Generate a random number between 0 and the total ratio percentage
        const random = Math.random() * totalRatio;


        // Find the offer that the random number falls within
        let offer;
        let ratioSum = 0;
        for (const o of campaign.offers) {
            ratioSum += o.ratio_percentage;
            if (random <= ratioSum) {
                offer = o;
                break;
            }
        }
        // Replace the {click_id} macro in the offer URL with the value of the click_id query parameter
        let offerUrl = offer.offer_url;
        if (click_id) {
            offerUrl = offerUrl.replace('{click_id}', click_id);
        }

        // Redirect the user to the offer URL
        res.redirect(offerUrl);

    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.redirectURL = redirectURL;
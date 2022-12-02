const campaigncollectionModel = require("../models/campaigncollectionModel.js");

const validators = require("../validator/validator.js")

const createCampaign = async function(req, res) {
    try {

        let data = req.body;
        if (!validators.isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: 'Data is required' });
        };

        if (!validators.isValidField(data.name)) {
            return res.status(400).send({ status: false, message: 'Name is missing' });
        };

        if (!validators.isValidField(data.offers)) {
            return res.status(400).send({ status: false, message: 'Offers is missing' });
        };

        if (!validators.isValidField(data.id)) {
            return res.status(400).send({ status: false, message: 'id is missing' });
        };
        //from line no.9 to line no.19 these are just for validation purpose , i.e, just to cross check
        //the valid input from the frontend side


        let campaignAlreadyExist = await campaigncollectionModel.findOne({ name: data.name, offers: data.offers, id: data.id });

        //Line no. 25 is used for checking the availablity of same name and offers, if incase same name and offers
        //is present then it will show the message which is written in line no. 32

        if (campaignAlreadyExist)

            return res.status(400).send({ status: false, message: "Campaign already present" });

        const createCampaign = await campaigncollectionModel.create(data);

        //line no.34 is used for creating the Campaign data

        let { name, offers, id } = createCampaign;

        return res.status(201).send({ status: true, data: { name, offers, id } });

    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports.createCampaign = createCampaign
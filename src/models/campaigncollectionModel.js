const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({

    short_token: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: Number,
        required: true
    },
    offers: [{
        offer_url: {
            type: String,
            required: true
        },
        ratio_percentage: {
            type: Number,
            required: true
        }
    }],
    enabled: {
        type: boolean,
        default: true
    }
}, { timestamps: true });
module.exports = mongoose.model("Campaign", campaignSchema);
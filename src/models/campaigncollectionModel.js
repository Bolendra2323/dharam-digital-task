const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    short_token: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    offers: [{
        offer_url: {
            type: Object,
            required: true
        },
        ratio_percentage: {
            type: Number,
            required: true
        }
    }],
    enabled: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
module.exports = mongoose.model("Campaign", campaignSchema);
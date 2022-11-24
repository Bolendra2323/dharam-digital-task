const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const isValidField = function(value) {
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false;

    return true;
};

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0;
};


module.exports = { isValidField, isValidRequestBody };
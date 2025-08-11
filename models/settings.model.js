const mongoose = require('mongoose');
const settingSchema=new mongoose.Schema({
    website_title: {type: String, required: true},
    website_logo: {type: String},
    website_footer: {type: String, required: true}

});

module.exports = mongoose.model('Setting', settingSchema);

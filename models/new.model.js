var mongoose = require('mongoose');

const mongoPaginate = require('mongoose-paginate-v2');
var newsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    image: {type: String},
}, {timestamps: true});

newsSchema.plugin(mongoPaginate);

module.exports = mongoose.model('News', newsSchema);

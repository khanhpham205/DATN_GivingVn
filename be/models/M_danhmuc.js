const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogsSchema = new Schema({
    name: { type: String, required: true, unique: true},
    desc: { type: String, required: true},
});

const Danhmuc = mongoose.model('danhmuc', catalogsSchema);
module.exports = Danhmuc;
var mongoose = require('mongoose')

const SessionSchema  = new mongoose.Schema({
    fingerprint:  String,
    layout: [],
    images: [],
    date: { type: Date, default: Date.now },
    hidden: Boolean
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
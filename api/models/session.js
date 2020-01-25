var mongoose = require('mongoose')

const SessionSchema  = new mongoose.Schema({
    fingerprint:  String,
    layout: [],
    date: { type: Date, default: Date.now },
    hidden: Boolean
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
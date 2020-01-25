var Session = require('../models/session')

exports.get = async function(query, page, limit) {

    try {
        //var Sessions = await Session.find(query)
        var user = new Session({title: "hi sathya"});


        return user.save();
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users' + e)
    }
}

exports.save = async function(params) {
    try {
        //var user = new Session();
        var result =  await Session.update(
            {fingerprint: params.figerprint},
            {fingerprint: params.figerprint, layout: JSON.parse(params.layout)},
            {upsert: true}
        );

        return result;
    } catch (e) {

        throw Error('Error while Paginating Users' + e)
    }
}
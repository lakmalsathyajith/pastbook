var Session = require('../models/session')

exports.get = async function(params) {
    try {

        var Sessions = await Session.findOne({fingerprint: params.id});

        return Sessions;
    } catch (e) {

        throw Error('Error while Paginating Users' + e)
    }
}

exports.save = async function(params) {
    try {

        var result =  await Session.update(
            {fingerprint: params.fingerprint},
            {fingerprint: params.fingerprint, images:JSON.parse(params.images), layout:JSON.parse(params.layout)},
            {upsert: true}
        );

        return result;
    } catch (e) {

        throw Error('Error while Paginating Users' + e)
    }
}
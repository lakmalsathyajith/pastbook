var SessionService = require('../services/Session')

exports.get = async function(req, res, next) {
    // Validate request parameters, queries using express-validator

    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
        var sessions = await SessionService.get({}, page, limit);
        return res.status(200).json({ status: 200, data: sessions, message: "Succesfully Sessions Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.save = async function(req, res, next) {
    // Validate request parameters, queries using express-validator




    try {
        var sessions = await SessionService.save(req.body);
        return res.status(200).json({ status: 200, data: sessions, message: "Succesfully Sessions Retrieved" });
    } catch (e) {

        console.log(e.message);
        return res.status(400).json({ status: 400, message: e.message });
    }
}
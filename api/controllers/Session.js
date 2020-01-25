var SessionService = require('../services/Session')

exports.get = async function(req, res, next) {

    try {
        var sessions = await SessionService.get(req.params);
        return res.status(200).json({ status: 200, data: sessions, message: "Succesfully Sessions Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.save = async function(req, res, next) {

    try {
        var sessions = await SessionService.save(req.body);
        return res.status(200).json({ status: 200, data: sessions, message: "Succesfully Sessions Saved" });
    } catch (e) {

        console.log(e.message);
        return res.status(400).json({ status: 400, message: e.message });
    }
}
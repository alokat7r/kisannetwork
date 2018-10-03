var express = require('express');
var http = require("http");
var router = express.Router();
var generalFunctions = require('../general');
const KisanNetworkModel = require('../models/message-log');

/* GET home page. */
router.get('/contactslist', (req, res, next) => {
    let resBody = [{
        id: 1,
        first_name: "Alok -1",
        last_name: "Singh",
        mobile_number: "917838981669"
    }, {
        id: 2,
        first_name: "Kisan",
        last_name: "Network",
        mobile_number: "919971792703"
    }, {
        id: 3,
        first_name: "Alok -2",
        last_name: "Singh",
        mobile_number: "919897433253"
    }];
    res.json({
        data: resBody,
        error: null,
        status: 200
    });
});

/**
 * SEND SMS
 */
router.get('/sendsms', (reqS, res, next) => {
    let mobile_number = reqS.query.mobile || null;
    let otp = generalFunctions.getRandomNumber();
    let message = reqS.query.message != undefined ? `Hi.  Your  OTP  is: ${otp}, ${reqS.query.message}` : null;
    let name = reqS.query.name || null;
    var options = {
        "method": "GET",
        "hostname": "api.msg91.com",
        "port": null,
        "path": encodeURI(`/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=${mobile_number}&authkey=240694Arm4ogTjGfg5bb382b2&message=${message}&response=json&unicode=1`),
        "headers": {}
    };

    var req = http.request(options, function(messageServiceRes) {
        var chunks = [];

        messageServiceRes.on("data", function(chunk) {
            chunks.push(chunk);
        });

        messageServiceRes.on("end", function() {
            var body = Buffer.concat(chunks);
            let jsonBody = JSON.parse(body.toString());
            if (jsonBody.type == "success") {
                let KisanNetworkModelObject = new KisanNetworkModel({
                    name: name,
                    mobile: mobile_number,
                    otp: otp
                });
                KisanNetworkModelObject.save();
                res.json({
                    data: jsonBody,
                    error: null,
                    status: messageServiceRes.statusCode
                });
            } else {
                res.json({
                    data: null,
                    error: jsonBody.message,
                    status: 500
                });
            }

        });
    });

    req.end();
});

/**
 * GET LOG
 */
router.get('/messageslog', (req, res, next) => {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let skip = (page - 1) * limit;
    KisanNetworkModel.find({}, null, { skip: skip, limit: limit, sort: { createdAt: -1 } }).then((result) => {
        res.json({
            data: result,
            error: null,
            status: 200
        });
    }).catch((err) => {
        res.json({
            data: null,
            error: err.message,
            status: 500
        });
    });
});

module.exports = router;
var express = require('express');
var http = require("http");
var router = express.Router();

/* GET home page. */
router.get('/contactlist', (req, res, next) => {
    let resBody = [{
        id: 1,
        first_name: "Alok Ranjan",
        last_name: "Singh",
        mobile_number: "917838981669"
    }, {
        id: 2,
        first_name: "Kisan",
        last_name: "Network",
        mobile_number: "919971792703"
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
    let message = reqS.query.message || null;
    console.log("IN", mobile_number);
    var options = {
        "method": "GET",
        "hostname": "api.msg91.com",
        "port": null,
        "path": `/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=${mobile_number}&authkey=240694Arm4ogTjGfg5bb382b2&message=Hello&response=json`,
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
            console.log("RES-", jsonBody);
            if (jsonBody.type == "success") {
                res.json({
                    data: jsonBody,
                    error: null,
                    status: res.statusCode
                });
            } else {
                res.json({
                    data: null,
                    error: jsonBody.message,
                    status: res.statusCode
                });
            }
            req.end();
        });

    });

});

/**
 * GET LOG
 */
router.get('/getlog', (req, res, next) => {

});

module.exports = router;
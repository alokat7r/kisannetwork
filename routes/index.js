var express = require('express');
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
router.get('/sendsms', (req, res, next) => {

});

module.exports = router;
var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res, next) {
  return res.render('index', {
    origin: 'Goodcents Deli Fresh Subs, 6250 Johnson Dr, Mission, KS 66202',
    destination: 'C2FO, 4210 Shawnee Mission Pkwy #400A, Fairway, KS 66205'
  });
});

router.post('/', function(req, res, next) {
  var origin = req.body.origin || "",
    destination = req.body.destination || "";

  request.get({
    uri: 'https://maps.googleapis.com/maps/api/directions/json',
    qs: {
      origin: origin,
      destination: destination,
      key: process.env.BUNGII_GOOGLE_MAP_API_KEY
    }
  }, function(error, response, body) {
    console.log(body)

    if (error) {
      console.error(error);
      return res.render('index', {
        results: error,
        origin: origin,
        destination: destination
      });
    } else {
      return res.render('index', {
        results: body,
        origin: origin,
        destination: destination
      });
    }
  });
});

module.exports = router;

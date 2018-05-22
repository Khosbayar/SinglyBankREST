var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SinglyBank' });
});
// test
router.get('/test',function(req,res){
  const homeData = {
    _id: "1",
    name: "Asaad",
    balance: "1340",
    expenses: "160",
    lastpayment: "20 June 2017",
    chart: [
        { category: "Services", percentage: "30" },
        { category: "HealthCare", percentage: "30" },
        { category: "Restaurants", percentage: "40" }
    ]
  };
  res.send(JSON.stringify(homeData));
});

module.exports = router;

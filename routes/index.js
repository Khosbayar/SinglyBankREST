var express = require('express');
var router = express.Router();

const cust_controller = require('../controllers/customerController');

router.post('/',cust_controller.login);

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

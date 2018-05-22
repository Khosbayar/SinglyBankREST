var express = require('express');
var router = express.Router();

const cust_controller = require('../controllers/customerController');
const acct_controller = require('../controllers/accountController');

router.get('/', cust_controller.cust_list);

router.post('/', cust_controller.create_cust);

router.get('/:id', cust_controller.cust_detail);

router.get('/:id/acct', acct_controller.cust_acct_list);

router.put('/:id', cust_controller.update_cust);

module.exports = router;

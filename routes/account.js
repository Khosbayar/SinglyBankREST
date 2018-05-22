var express = require('express');
var router = express.Router();

const acct_controller = require('../controllers/accountController');

router.get('/', acct_controller.acct_list);

router.post('/', acct_controller.create_acct);

router.get('/:id', acct_controller.acct_detail);

router.put('/:id', acct_controller.update_acct);

module.exports = router;
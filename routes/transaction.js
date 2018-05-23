var express = require('express');
var router = express.Router();

const tran_controller = require('../controllers/tranController');

router.get('/', tran_controller.tran_list);

router.post('/', tran_controller.make_tran);

module.exports = router;
var express = require('express');
var router = express.Router();

const tran_controller = require('../controllers/tranController');

router.get('/', tran_controller.tran_list);

router.post('/deposit', tran_controller.make_tran);
router.post('/withdraw', tran_controller.make_tran);

module.exports = router;
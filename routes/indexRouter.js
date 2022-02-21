const express = require('express');
const router = express.Router();

const controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', controller.index);

router.get('/down1Create', controller.down1Create);
router.get('/down2Create', controller.down2Create);
router.get('/down3Create', controller.down3Create);

router.get('/down1', controller.down1);
router.get('/down2', controller.down2);
router.get('/down3', controller.down3);

module.exports = router;

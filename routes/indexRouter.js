const express = require('express');
const router = express.Router();

const controller = require('../controllers/indexController');

/* GET home page. */
router.get('/', controller.index);
router.get('/down1', controller.down1);
router.get('/down2', controller.down2);
router.get('/down3', controller.down3);
router.get('/down4', controller.down4);

module.exports = router;

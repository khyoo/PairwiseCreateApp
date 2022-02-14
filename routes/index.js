var express = require('express');
var router = express.Router();

const fs = require('fs');

let pairwise_func = require('../service/pairwise_func.js');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/down1', function (req, res, next) {
	var pair_result = pairwise_func.random_create(Number(req.query.pairSetCnt), Number(req.query.compCnt));
	//console.log(pair_result);
	let idx = 1;
	let str_result = 'id, img1, img2\n';
	pair_result.forEach(function (element) {
		str_result += idx;
		str_result += ', ';
		str_result += element[0];
		str_result += ', ';
		str_result += element[1];
		str_result += '\n';

		idx++;
	});
	fs.writeFileSync('public/randomSet.txt', str_result);
	var file = 'public/randomSet.txt';

	res.download(file);
});

router.get('/down2', function (req, res, next) {
	var pair_result = pairwise_func.pairwise_create(Number(req.query.pairSetCnt), Number(req.query.compCnt));
	//console.log(pair_result);
	let idx = 1;
	let str_result = 'id, img1, img2\n';
	pair_result.forEach(function (element) {
		str_result += idx;
		str_result += ', ';
		str_result += element[0];
		str_result += ', ';
		str_result += element[1];
		str_result += '\n';

		idx++;
	});
	fs.writeFileSync('public/pairwiseSet.txt', str_result);
	var file = 'public/pairwiseSet.txt';

	res.download(file);
});

router.get('/down3', function (req, res, next) {
	fs.writeFileSync('public/test2.txt', 'ksjfkdsj11122233');
	var file = 'public/test.txt';

	res.download(file);
});

router.get('/down4', function (req, res, next) {
	fs.writeFileSync('public/test2.txt', 'ksjfkdsj11122233');
	var file = 'public/test.txt';

	res.download(file);
});


module.exports = router;

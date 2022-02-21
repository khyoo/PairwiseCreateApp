const express = require('express');
const fs = require('fs');

const pairwise_func = require('./pairwiseFunc');

module.exports = {
	index: function (req, res, next) {
		res.render('index', { title: '랜덤 그래프 데이터셋 생성' });
	},
	down1Create: function (req, res, next) {
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
		fs.writeFileSync('./public/randomSet.txt', str_result);
			
		res.send({result:'ok'});
	},
	down2Create: function (req, res, next) {
		var pair_result = pairwise_func.ringRandom_create(Number(req.query.pairSetCnt), Number(req.query.compCnt), Number(req.query.steps));
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
		fs.writeFileSync('./public/ringRandomSet.txt', str_result);
			
		res.send({result:'ok'});
	},
	down3Create: function (req, res, next) {
		var pair_result = pairwise_func.chainRandom_create(Number(req.query.pairSetCnt), Number(req.query.compCnt));
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
		fs.writeFileSync('./public/chainRandomSet.txt', str_result);
			
		res.send({result:'ok'});
	},
	down1: function (req, res, next) {		
		var file = './public/randomSet.txt';	
		res.download(file);
	},
	down2: function (req, res, next) {		
		var file = './public/ringRandomSet.txt';	
		res.download(file);
	},
	down3: function (req, res, next) {
		var file = './public/chainRandomSet.txt';	
		res.download(file);
	}	
}
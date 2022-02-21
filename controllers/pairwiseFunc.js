exports.random_create = function(pairSetCnt, compCnt) {
	var rand = random_shuffle(pairSetCnt);

	let pair_result = new Array();

	let k = compCnt;
	let c1, c2;

	while (k >= 1) {
		while (rand.length > 0) {			
			c1 = randomPoll(rand);			
			c2 = randomPoll(rand);

			while (pairwise_exist(pairwise_sort(c1, c2), pair_result)) {
				rand.push(c2);
				c2 = randomPoll(rand);
			}			
			pair_result.push(pairwise_sort(c1, c2))
		}
		rand = random_shuffle(pairSetCnt);

		k = k - 1;
	}
	return pair_result;
}

exports.ringRandom_create = function(pairSetCnt, compCnt, steps) {
	let rand = random_shuffle(pairSetCnt);
	
	let pair_result = new Array();

	let k = compCnt;
	let c1, c2;
	steps = 1;
	while (k >= 2) {
		c1 = rand[0];
		let idx1 = 0, idx2 = steps;

		while ((rand.length-1) >= idx1) {
			c2 = rand[idx2];			
			//pair_result.push(pairwise_sort(c1, c2));
			pair_result.push([c1, c2]);

			idx1++;
			idx2 = steps + idx1;
			if (idx2 > (rand.length-1)) {
				idx2 = idx2 - rand.length;
			}

			c1 = rand[idx1];
		}
		steps++;
		k = k - 2;
	}
	if (k == 1 && rand.length >= 2) {
		disjointPairwise_create(rand, pair_result);
	}
	return pair_result;//.sort(() => Math.random() - 0.5);
}

exports.chainRandom_create = function(pairSetCnt, compCnt) {
	let rand = random_shuffle(pairSetCnt);

	let pair_result = new Array();

	let k = compCnt;
	let head, c1, c2;

	while (k >= 2 && rand.length >= 2) {
		head = c1 = randomPoll(rand);

		while (rand.length > 0) {			
			c2 = randomPoll(rand);

			while (pairwise_exist(pairwise_sort(c1, c2), pair_result)) {
				rand.push(c2);
				c2 = randomPoll(rand);
			}
			pair_result.push(pairwise_sort(c1, c2))

			c1 = c2;
		}
		pair_result.push(pairwise_sort(head, c1))

		rand = random_shuffle(pairSetCnt);

		k = k - 2;
	}
	if (k == 1 && rand.length >= 2) {
		disjointPairwise_create(rand, pair_result);
	}
	return pair_result.sort(() => Math.random() - 0.5);
}

function disjointPairwise_create(rand, pair_result) {
	let c1, c2, len;
	len = rand.length;

	c1 = randomPoll(rand);

	while (c1 != 'undefined' && rand.length > 0) {
		c2 = randomPoll(rand);
 
		while (pairwise_exist(pairwise_sort(c1, c2), pair_result)) {
			rand.push(c2);
			c2 = randomPoll(rand);
		}		
		pair_result.push(pairwise_sort(c1, c2))

		c1 = randomPoll(rand);
		
		if ((len % 2) == 1 && rand.length == 0) {
			let t;
			t = Math.floor(Math.random() * len);
			while (pairwise_exist(pairwise_sort(c1, t), pair_result)) {				
				t = Math.floor(Math.random() * len);
			}			
			pair_result.push(pairwise_sort(c1, t));
		}
	}
}

function randomPoll(rand) {
	let val, idx; 

	idx = Math.floor(Math.random() * rand.length);
	val = rand[idx];
	rand.splice(idx, 1);

	return val;
}

function pairwise_sort(val1, val2) {
	var result = [];
	if (val1 > val2) {
		result.push(val2);
		result.push(val1);
	} else {
		result.push(val1);
		result.push(val2);
	}
	return result;
}

function pairwise_exist(arr, pair_result) {
	var result = false;

	for (var i = 0; i < pair_result.length; i++) {
		let temp = pair_result[i];
		if (temp[0] == arr[0] && temp[1] == arr[1]) {
			result = true;
		}
	}
	return result;
}

function random_shuffle(pairSetCnt) {
	let rand = new Array();
	for (var i = 1; i <= pairSetCnt; i++) {
		rand.push(i);
	}
	rand.sort(() => Math.random() - 0.5);

	return rand;
}
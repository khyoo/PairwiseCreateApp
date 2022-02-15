exports.random_create = function(pairSetCnt, compCnt) {
	var rand = new Array();

	rand.concat(random_shuffle(rand, pairSetCnt));

	let pair_result = new Array();

	let k = compCnt;
	let c1, c2;

	while (k >= 1) {
		while (rand.length > 0) {
			let r_idx1 = Math.floor(Math.random() * rand.length);
			c1 = rand[r_idx1];
			rand.splice(r_idx1, 1);

			let r_idx2 = Math.floor(Math.random() * rand.length);
			c2 = rand[r_idx2];

			while (pairwise_exist(pairwise_sort(c1, c2), pair_result)) {
				r_idx2 = Math.floor(Math.random() * rand.length);
				c2 = rand[r_idx2];
			}
			rand.splice(r_idx2, 1);
			pair_result.push(pairwise_sort(c1, c2))
		}

		rand.concat(random_shuffle(rand, pairSetCnt));

		k = k - 1;
	}
	return pair_result;
}

exports.pairwise_create = function(pairSetCnt, compCnt) {
	let rand = new Array();

	rand.concat(random_shuffle(rand, pairSetCnt));

	let pair_result = new Array();

	let k = compCnt;
	let head, c1, c2;

	while (k >= 2) {
		head = c1 = rand.shift();

		while (rand.length > 0) {
			c2 = rand[0];

			let idx = 0;
			while (pairwise_exist(pairwise_sort(c1, c2), pair_result)) {
				c2 = rand[++idx];
			}
			rand.splice(idx, 1);
			pair_result.push(pairwise_sort(c1, c2))

			c1 = c2;
		}
		pair_result.push(pairwise_sort(head, c1))

		rand.concat(random_shuffle(rand, pairSetCnt));

		k = k - 2;
	}
	return pair_result.sort(() => Math.random() - 0.5);
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

function random_shuffle(rand, pairSetCnt) {
	for (var i = 1; i <= pairSetCnt; i++) {
		rand.push(i);
	}
	rand.sort(() => Math.random() - 0.5);

	return rand;
}
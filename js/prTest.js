export function generateStatisticTest(numbers) {
	let results = {
		ksResult: false,
	};

	results.ksResult = getKs(numbers);

	return results;
}

function getKs(numbers) {
	let n = numbers.length;
	let sortedNum = sortAsc(numbers);
	let dPlus = [];
	let dMinus = [];

	for (let i = 1; i < n; i++) {
		dPlus.push(i / n - sortedNum[i]);
		dMinus.push(sortedNum[i] - (i - 1) / n);
	}

	let maxD = [Math.max(...dPlus), Math.max(...dMinus)];
	let finalStat = Math.max(...maxD);

	return finalStat < 1.36 / Math.sqrt(n);
}

function sortAsc(numbers) {
	return numbers.sort(function (a, b) {
		return a - b;
	});
}

export function generateStatisticTest(numbers) {
	let results = {
		ksResult: {},
		runsResult: {},
		autoCorrelationResult: {},
	};

	results.ksResult = getKs(numbers);
	results.runsResult = getRuns(numbers);
	results.autoCorrelationResult = getAutocorrelation(numbers);

	return results;
}

function getKs(numbers) {
	let n = numbers.length;
	if (n < 2) return false; // evitar división entre cero o listas muy pequeñas

	// Ordenamos los números ascendentemente
	let sortedNum = [...numbers].sort((a, b) => a - b);

	let dPlus = [];
	let dMinus = [];

	for (let i = 1; i <= n; i++) {
		let Femp = i / n;
		let FempAnterior = (i - 1) / n;
		let x = sortedNum[i - 1];

		dPlus.push(Femp - x);
		dMinus.push(x - FempAnterior);
	}

	let dPlusMax = Math.max(...dPlus);
	let dMinusMax = Math.max(...dMinus);

	let D = Math.max(dPlusMax, dMinusMax);

	// Valor crítico KS para α = 0.05
	let Dcrit = 1.36 / Math.sqrt(n);

	return {
		D,
		Dcrit,
		pass: D < Dcrit,
	};
}

function getRuns(numbers) {
	let signs = [];

	// Generar signos + o -
	for (let i = 0; i < numbers.length - 1; i++) {
		if (numbers[i] < numbers[i + 1]) signs.push("+");
		else if (numbers[i] > numbers[i + 1]) signs.push("-");
		// si son iguales, no se agrega signo
	}

	// Contar corridas
	let totalRuns = 1;
	for (let i = 1; i < signs.length; i++) {
		if (signs[i] !== signs[i - 1]) {
			totalRuns++;
		}
	}

	let n = signs.length;
	let e = (2 * n - 1) / 3;
	let v = (16 * n - 29) / 90;
	let z = (totalRuns - e) / Math.sqrt(v);

	console.log(`signos = ${signs.join(" ")}`);
	console.log(
		`Corridas = ${totalRuns}, Esperado = ${e}, Varianza = ${v}, Z = ${z}`,
	);

	return {
		v: v,
		z: z,
		pass: -1.96 < z && z < 1.96,
	};
}

function getAutocorrelation(numbers) {
	let n = numbers.length;
	let k = 2;

	let mean = sumArrayElements(numbers) / n;

	let xi = numbers;
	let xi_K = [...numbers.slice(2, numbers.length - 1)];
	let xi_mean = [
		xi.forEach(element => {
			element -= mean;
		}),
	];
	let xi_K_mean = [
		xi_K.foreach(element => {
			element - mean;
		}),
	];
	let product = [];
	for (let i = 0; i < n; i++) {
		product.push(xi_mean[i] * xi_K_mean[i]);
	}

	let numerator = sumArrayElements(product);

	console.log(numerator);

	let denominatorTable = {
		xi: [],
		xi_mean: [],
		squared: [],
	};
	let denominator = sumArrayElements(denominatorTable.squared);

	let rk = numerator / denominator;
	let z = rk * Math.sqrt(n);
	return {
		rk: rk,
		z: z,
		pass: Math.abs(z) < 1.96,
	};
}

function sumArrayElements(array) {
	return array.reduce((c, currentV) => c + currentV, 0);
}

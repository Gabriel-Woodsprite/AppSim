function generateStatisticTest(numbers) {
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

	return {
		v: v,
		z: z,
		pass: -1.96 < z && z < 1.96,
	};
}

function getAutocorrelation(numbers) {
	let n = numbers.length;
	let k = 2;

	let mean = sumArrayElements([...numbers]) / n;

	let xi = [...numbers].slice(0, numbers.length - 2);
	let xi_K = [...numbers].slice(2, numbers.length);

	// X_i MINUS MEAN
	xi.forEach((number, index, array) => {
		array[index] = number - mean;
	});

	// X_i_K MINUS MEAN
	xi_K.forEach((number, index, array) => {
		array[index] = number - mean;
	});

	let product = [];
	for (let i = product; i < xi.length; i++) {
		product[i] = xi[i] * xi_K[i];
	}
	let numerator = sumArrayElements(product);

	let productDen = [...numbers];

	productDen.forEach((number, index, array) => {
		array[index] = (number - mean) * (number - mean);
	});
	let denominator = sumArrayElements(productDen);

	let rk = numerator / denominator;
	let z = rk * Math.sqrt(n);
	return {
		rk: rk,
		z: z,
		pass: Math.abs(z) < 1.96,
	};
}

function getChiSq(numbers) {
	// Cantidad de intervalos
	let k = 5;
	let df = k - 1;
	let n = numbers.length;
	let E = n / k; // Frecuencia esperada

	// Tabla chi-cuadrada para alfa = 0.05
	const chiSquareCritical = {
		1: 3.841,
		2: 5.991,
		3: 7.815,
		4: 9.488,
		5: 11.07,
		6: 12.592,
		7: 14.067,
		8: 15.507,
		9: 16.919,
		10: 18.307,
	};

	// Contadores para los intervalos
	let intervalCount = {
		int1: 0, // [0.0, 0.2)
		int2: 0, // [0.2, 0.4)
		int3: 0, // [0.4, 0.6)
		int4: 0, // [0.6, 0.8)
		int5: 0, // [0.8, 1.0)
	};

	// Clasificar números en intervalos
	for (let i = 0; i < n; i++) {
		let x = numbers[i];

		if (x >= 0 && x < 0.2) intervalCount.int1++;
		else if (x >= 0.2 && x < 0.4) intervalCount.int2++;
		else if (x >= 0.4 && x < 0.6) intervalCount.int3++;
		else if (x >= 0.6 && x < 0.8) intervalCount.int4++;
		else if (x >= 0.8 && x < 1.0) intervalCount.int5++;
	}

	// Convertir a arreglo O[i]
	const O = [
		intervalCount.int1,
		intervalCount.int2,
		intervalCount.int3,
		intervalCount.int4,
		intervalCount.int5,
	];

	// Calcular chi-cuadrada
	let chiCalc = 0;
	for (let i = 0; i < k; i++) {
		chiCalc += Math.pow(O[i] - E, 2) / E;
	}

	let chiCrit = chiSquareCritical[df];
	let pass = chiCalc < chiCrit;

	return {
		observed: O,
		expected: E,
		chiCalc: chiCalc,
		chiCrit: chiCrit,
		df: df,
		pass: pass,
	};
}

function sumArrayElements(array) {
	return array.reduce((c, currentV) => c + currentV, 0);
}

export { generateStatisticTest, getKs, getChiSq };

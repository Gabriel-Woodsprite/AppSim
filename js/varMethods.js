import { getCL, getMCG } from "./pseudoMethods.js";
import { fillTable } from "./util/fillTable.js";

////////////////////////////
/// TRANSFORMADA INVERSA ///
////////////////////////////

function transformadaInversa(lambda, variablesRange) {
	let variablesArray = [];
	let generatedNumbers = getMCG(Date.now(), variablesRange).ui;

	const EPS = 1e-12;

	for (let i = 0; i < variablesRange; i++) {
		let U = generatedNumbers[i];
		U = Math.min(Math.max(U, EPS), 1 - EPS); // evita 0 y 1 exactos

		variablesArray[i] = -(1 / lambda) * Math.log(1 - U);
	}

	fillTable(variablesArray, "ti-table");

	return { ui: generatedNumbers, xi: variablesArray, lambda };
}

function cdfExponencial(lambda) {
	return x => 1 - Math.exp(-lambda * x);
}

// Uso:

/****************************************************************************************************************/

///////////////////
/// CONVOLUCIÒN ///
///////////////////

function convolucion(sigma, mu, variablesRange) {
	let variableArray = [];
	const k = 12;

	// generar todos de un golpe para evitar patrones
	let allRandoms = getMCG(Date.now(), variablesRange * k).ui;

	for (let i = 0; i < variablesRange; i++) {
		let sum12 = 0;

		for (let j = 0; j < k; j++) {
			sum12 += allRandoms[i * k + j];
		}

		let Z = sum12 - 6;
		let X = mu + sigma * Z;

		variableArray[i] = X;
	}

	fillTable(variableArray, "conv-table");
	console.log(variableArray, sigma, mu);
	return { variableArray, sigma, mu };
}

function normalCdf(z) {
	return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

// Aproximación de erf (suficiente para KS)
function erf(x) {
	const a1 = 0.254829592;
	const a2 = -0.284496736;
	const a3 = 1.421413741;
	const a4 = -1.453152027;
	const a5 = 1.061405429;
	const p = 0.3275911;

	const sign = x < 0 ? -1 : 1;
	x = Math.abs(x);

	const t = 1 / (1 + p * x);
	const y =
		1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

	return sign * y;
}

function cdfNormal(mu, sigma) {
	return x => normalCdf((x - mu) / sigma);
}

/****************************************************************************************************************/

///////////////////
/// COMPOSICIÒN ///
///////////////////
function composicion(probabilidad, lambda, generatedRange, mu, sigma) {
	let p = probabilidad / 100;
	let Uall = getMCG(Date.now(), generatedRange).ui;

	let variables = [];
	const EPS = 1e-12;

	for (let i = 0; i < generatedRange; i++) {
		let U = Uall[i];

		if (U < p) {
			// ------------------------
			// 🎲 Parte Exponencial
			// ------------------------
			let U2 = Math.min(Math.max(U, EPS), 1 - EPS);
			variables[i] = -(1 / lambda) * Math.log(1 - U2);
		} else {
			// ------------------------
			// 🎲 Parte Normal (convolución)
			// ------------------------
			let U12 = getMCG(Date.now() + i, 12).ui;
			let sum = 0;
			for (let j = 0; j < 12; j++) sum += U12[j];

			let Z = sum - 6; // normal ~N(0,1)
			variables[i] = mu + sigma * Z;
		}
	}
	console.log(variables);
	fillTable(variables, "comp-table");

	return { variables, p, lambda, mu, sigma };
}

// Aproximación erf (numérica, muy precisa)
// function erf(x) {
// 	const a1 = 0.254829592,
// 		a2 = -0.284496736,
// 		a3 = 1.421413741,
// 		a4 = -1.453152027,
// 		a5 = 1.061405429;
// 	const p = 0.3275911;

// 	let sign = x < 0 ? -1 : 1;
// 	x = Math.abs(x);

// 	let t = 1 / (1 + p * x);
// 	let y =
// 		1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

// 	return sign * y;
// }

// CDF normal estándar Φ(z)
function normalCDF(z) {
	return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

function cdfComposicion(p, lambda, mu, sigma) {
	return x => {
		if (x < 0) return 0;

		// Exponencial
		let Fexp = 1 - Math.exp(-lambda * x);

		// Normal
		let z = (x - mu) / sigma;
		let Fnorm = normalCDF(z);

		// Mixtura
		return p * Fexp + (1 - p) * Fnorm;
	};
}

/****************************************************************************************************************/

export {
	transformadaInversa,
	convolucion,
	composicion,
	cdfExponencial,
	cdfNormal,
	cdfComposicion,
};

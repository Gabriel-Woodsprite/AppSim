import { getMCG } from "./pseudoMethods.js";
import { fillTable } from "./util/fillTable.js";

////////////////////////////
/// TRANSFORMADA INVERSA ///
////////////////////////////

function transformadaInversa(lambda, variablesRange) {
	let variablesArray = [];
	let generatedNumbers = getMCG(Date.now(), variablesRange).ui;

	if (!isNaN(lambda)) {
		if (lambda > 0) {
			for (let i = 0; i < variablesRange; i++) {
				variablesArray[i] = -(1 / lambda) * Math.log10(1 - generatedNumbers[i]);
			}
		}
	}
	fillTable(variablesArray, "ti-table");
}
/****************************************************************************************************************/

///////////////////
/// CONVOLUCIÒN ///
///////////////////

function convolucion(sigma, mu, variablesRange) {
	let generatedNumbers = [];
	let variableArray = [];

	for (let i = 0; i < variablesRange; i++) {
		let sum12 = 0;
		generatedNumbers = getMCG(Date.now() + i, 12).ui;

		for (let j = 0; j < 12; j++) {
			sum12 += generatedNumbers[j];
		}
		let Z = sum12 - 6;
		let X = mu + sigma * Z;

		variableArray[i] = X;
	}

	fillTable(variableArray, "conv-table");
}

/****************************************************************************************************************/

///////////////////
/// COMPOSICIÒN ///
///////////////////

function composicion(probabilidad, lambda, generatedRange) {
	let generatedNumbers = getMCG(Date.now(), generatedRange).ui;
	let generatedVariables = [];

	console.log(generatedNumbers, lambda, probabilidad);
	for (let i = 0; i < generatedRange; i++) {
		if (generatedNumbers[i] >= probabilidad / 100) {
			generatedVariables[i] =
				-(1 / lambda) * Math.log10(1 - generatedNumbers[i]);
		}
		if (generatedNumbers[i] < probabilidad / 100) {
			generatedVariables[i] =
				Math.log10(1 - generatedNumbers[i]) /
				Math.log10(1 - Number(probabilidad / 100));

			console.log(generatedNumbers[i]);
			console.log(Math.log10(1 - generatedNumbers[i]));
			console.log(Math.log10(1 - Number(probabilidad) / 100));
		}
	}
	fillTable(generatedVariables, "comp-table");
}
/****************************************************************************************************************/

export { transformadaInversa, convolucion, composicion };

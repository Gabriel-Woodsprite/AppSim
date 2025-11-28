import { fillTable } from "./fillTable.js";
import { getMCG } from "./pseudoMethods.js";

let variablesArray = [];

if (document.querySelector(".btn-TI")) {
	let btnTi = document.querySelector(".btn-TI");
	btnTi.addEventListener("click", e => {
		e.preventDefault();
		let lambda = Number(document.querySelector(".lambda").value);
		let variablesRange = Number(document.querySelector(".range-TI").value);
		let generatedNumbers = getMCG(Date.now(), variablesRange).ui;

		variablesArray = getTransformada(lambda, variablesRange, generatedNumbers);

		fillTable(variablesArray, "ti-table");
	});
}

function getTransformada(lambda, variablesRange, generatedNumbers) {
	let generatedVariables = [];
	if (!isNaN(lambda)) {
		if (lambda > 0) {
			for (let i = 0; i < variablesRange; i++) {
				generatedVariables[i] =
					-(1 / lambda) * Math.log10(1 - generatedNumbers[i]);
			}
		}
	}
	return generatedVariables;
}

// Exportar una función para generar fuera del click (uso por index.js)
// Retorna el arreglo de variables generadas (no modifica la UI)
export function generarTransformadaInversa(lambda, variablesRange) {
	// Validaciones mínimas
	if (isNaN(lambda) || lambda <= 0) return [];
	if (!Number.isInteger(variablesRange) || variablesRange <= 0) return [];

	// Generar uniforms y X con tus funciones existentes
	const generatedNumbers = getMCG(Date.now(), variablesRange).ui;
	const X = getTransformada(lambda, variablesRange, generatedNumbers);

	return X;
}

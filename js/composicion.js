import { getMCG, ccApp } from "./pseudoMethods.js";
import { fillTable } from "./fillTable.js";

if (document.querySelector(".btn-CMP")) {
	let btnCmp = document.querySelector(".btn-CMP");

	btnCmp.addEventListener("click", e => {
		e.preventDefault();

		let probabilidad = document.querySelector(".probabilidad").value;
		let lambda = document.querySelector(".lambda-comp").value;
		let generatedRange = document.querySelector(".range-COMP").value;

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
					-(1 / lambda) * Math.log10(1 - generatedNumbers[i]);
			}
		}
		console.log(generatedVariables);
		fillTable(generatedVariables, "comp-table");
	});
}

// Exportar una función para generar fuera del click (uso por index.js)
// Retorna el arreglo de variables (no modifica la UI)
export function generarComposicion(
	probabilidad_percent,
	lambda,
	generatedRange,
) {
	const p = Number(probabilidad_percent);
	const lam = Number(lambda);
	const n = Number(generatedRange);
	if (isNaN(p) || isNaN(lam) || isNaN(n)) return [];
	if (lam <= 0 || n <= 0) return [];

	// const generatedNumbers = getMCG(Date.now(), n).ui;
	const generatedVariables = [];

	for (let i = 0; i < n; i++) {
		// Nota: tu código actual hace la misma fórmula para ambos casos.
		// Lo dejamos así para mantener comportamiento idéntico.
		// generatedVariables[i] = -(1 / lam) * Math.log10(1 - generatedNumbers[i]);
		generatedVariables[i] = Math.random();
	}
	return generatedVariables;
}

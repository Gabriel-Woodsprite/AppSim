import { getMCG } from "./pseudoMethods.js";
import { fillTable } from "./fillTable.js";

let generatedNumbers = [];
let variableArray = [];
if (document.querySelector(".btn-CONV")) {
	let flipCard__btn = document.querySelector(".btn-CONV");

	flipCard__btn.addEventListener("click", e => {
		e.preventDefault();

		let sigma = Number(document.querySelector(".sigma").value);
		let mu = Number(document.querySelector(".mu").value);
		let variablesRange = Number(
			document.querySelector(".variablesRange").value,
		);

		if (!isNaN(sigma) && !isNaN(mu)) {
			if (sigma > 0 && mu > 0) {
				for (let i = 0; i < variablesRange; i++) {
					let summatory = 0;
					generatedNumbers = getMCG(Date.now() + i, 12).ui;
					console.log(generatedNumbers);
					console.log("---------------------------");
					for (let j = 0; j < 12; j++) {
						console.log(generatedNumbers[j]);
						summatory += (generatedNumbers[j] - 6) * sigma + mu;
					}
					variableArray[i] = summatory;
				}
				fillTable(variableArray, "conv-table");
			} else {
				alert("Ingrese valores mayores a 0 solamente");
			}
		} else {
			alert("Ingrese valores numericos solamente");
		}
	});
}

// Exportar una función para generar fuera del click (uso por index.js)
// Retorna el arreglo de variables (no modifica la UI)
export function generarConvolucion(mu, sigma, variablesRange) {
	if (isNaN(mu) || isNaN(sigma) || sigma <= 0) return [];
	if (!Number.isInteger(variablesRange) || variablesRange <= 0) return [];

	let generatedNumbers;
	let variableArrayLocal = [];

	for (let i = 0; i < variablesRange; i++) {
		let summatory = 0;
		generatedNumbers = getMCG(Date.now() + i, 12).ui;
		for (let j = 0; j < 12; j++) {
			summatory += (generatedNumbers[j] - 6) * sigma + mu;
		}
		variableArrayLocal[i] = summatory;
	}

	return variableArrayLocal;
}

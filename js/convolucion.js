import { getMCG } from "./pseudoMethods.js";
import { fillTable } from "./fillTable.js";

let generatedNumbers = [];
let variableArray = [];

let flipCard__btn = document.querySelector(".flip-card__btn");

flipCard__btn.addEventListener("click", e => {
	e.preventDefault();

	let lambda = Number(document.querySelector(".lambda").value);
	let mu = Number(document.querySelector(".mu").value);
	let variablesRange = Number(document.querySelector(".variablesRange").value);

	if (!isNaN(lambda) && !isNaN(mu)) {
		if (lambda > 0 && mu > 0) {
			for (let i = 0; i < variablesRange; i++) {
				let summatory = 0;
				generatedNumbers = getMCG(Date.now(), 12).ui;
				for (let j = 0; j < 12; j++) {
					summatory += (generatedNumbers[j] - 6) * lambda + mu;
				}
				variableArray[i] = summatory;
			}
			fillTable(variableArray);
		} else {
			alert("Ingrese valores mayores a 0 solamente");
		}
	} else {
		alert("Ingrese valores numericos solamente");
	}
});

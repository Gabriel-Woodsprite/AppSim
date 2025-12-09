import {
	getCM,
	getMC,
	getPM,
	getCA,
	getCL,
	getMCG,
	getCC,
	renderMetodo,
} from "./pseudoMethods.js";
import { generateStatisticTest } from "./prTest.js";
// import { clipboardCopy } from "./clipboardCopy.js";

let psNumButton = document.querySelector(".actionpsNumButton");
let statTest = document.querySelector(".statTestButton");
let tableTittle = document.querySelector(".tableTittle");
let currentNumbers = {};

psNumButton.addEventListener("click", () => {
	if (getCheckedRadio().length !== 0) {
		const section = document.getElementById("resultSection");
		section.classList.remove("hidden");
		section.classList.add("notHidden");

		setTimeout(() => {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: "smooth",
			});
		}, 100); // pequeño delay para que aparezca la sección primero

		// Llamamos a la función correcta según el radio seleccionado
		switch (getCheckedRadio()) {
			case "CM": //Cuadrados Medios
				currentNumbers = renderMetodo(getCM);
				tableTittle.textContent = "Cuadrados Medios";
				break;
			case "MC": //Multiplicador Constante
				currentNumbers = renderMetodo(getMC);
				tableTittle.textContent = "Multiplicador Constante";
				break;
			case "PM": //Productos Medios
				currentNumbers = renderMetodo(getPM);
				tableTittle.textContent = "Productos Medios";
				break;
			case "CA": //Congruencial Aditivo
				currentNumbers = renderMetodo(getCA);
				tableTittle.textContent = "Congruencial Aditivo";
				break;
			case "CL": //Congruencial Lineal
				currentNumbers = renderMetodo(getCL);
				tableTittle.textContent = "Congruencial Lineal";
				break;
			case "MCG": //Congruencial Multiplicativo
				currentNumbers = renderMetodo(getMCG);
				tableTittle.textContent = "Congruencial Multiplicativo";
				break;
			case "CC": //Congruencial Cuadratico
				currentNumbers = renderMetodo(getCC);
				tableTittle.textContent = "Congruencial Cuadrático";
				break;
			default:
				break;
		}
	}
});

statTest.addEventListener("click", () => {
	// console.log(generateStatisticTest(currentNumbers.ui));
	console.log(
		generateStatisticTest([
			0.12, 0.55, 0.31, 0.31, 0.8, 0.44, 0.67, 0.09, 0.22, 0.99,
		]),
	);
});

// Función para obtener qué radio está seleccionado
function getCheckedRadio() {
	let generatorName = "";
	let radios = document.querySelectorAll(".generatorRadio");
	radios.forEach(radio => {
		if (radio.checked) {
			generatorName = radio.id;
		}
	});
	return generatorName;
}

// clipboardCopy();

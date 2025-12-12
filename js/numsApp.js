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
import { generateStatisticTest } from "./test/prTest.js";
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
	let ks_d = document.querySelector(".ks-D");
	let ks_Dcrit = document.querySelector(".ks-Dcrit");
	let ks_pass = document.querySelector(".ks-pass");

	let runs_v = document.querySelector(".runs-v");
	let runs_z = document.querySelector(".runs-z");
	let runs_pass = document.querySelector(".runs-pass");

	let auto_rk = document.querySelector(".auto-rk");
	let auto_z = document.querySelector(".auto-z");
	let auto_pass = document.querySelector(".auto-pass");

	let testResults = generateStatisticTest(currentNumbers.ui);

	ks_d.textContent = testResults.ksResult.D;
	ks_Dcrit.textContent = testResults.ksResult.Dcrit;
	ks_pass.textContent = testResults.ksResult.pass ? "Pasa" : "No pasa";

	runs_v.textContent = testResults.runsResult.v;
	runs_z.textContent = testResults.runsResult.z;
	runs_pass.textContent = testResults.runsResult.pass ? "Pasa" : "No pasa";

	auto_rk.textContent = testResults.autoCorrelationResult.rk;
	auto_z.textContent = testResults.autoCorrelationResult.z;
	auto_pass.textContent = testResults.autoCorrelationResult.pass
		? "Pasa"
		: "No pasa";
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

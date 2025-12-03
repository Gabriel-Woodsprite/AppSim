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
// import { clipboardCopy } from "./clipboardCopy.js";

let psNumButton = document.querySelector(".psNumButton");
let tableTittle = document.querySelector(".tableTittle");

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
				renderMetodo(getCM);
				tableTittle.textContent = "Cuadrados Medios";
				break;
			case "MC": //Multiplicador Constante
				renderMetodo(getMC);
				tableTittle.textContent = "Multiplicador Constante";
				break;
			case "PM": //Productos Medios
				renderMetodo(getPM);
				tableTittle.textContent = "Productos Medios";
				break;
			case "CA": //Congruencial Aditivo
				renderMetodo(getCA);
				tableTittle.textContent = "Congruencial Aditivo";
				break;
			case "CL": //Congruencial Lineal
				renderMetodo(getCL);
				tableTittle.textContent = "Congruencial Lineal";
				break;
			case "MCG": //Congruencial Multiplicativo
				renderMetodo(getMCG);
				tableTittle.textContent = "Congruencial Multiplicativo";
				break;
			case "CC": //Congruencial Cuadratico
				renderMetodo(getCC);
				tableTittle.textContent = "Congruencial Cuadrático";
				break;
			default:
				break;
		}
	}
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

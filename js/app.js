import {
	cmApp,
	mcApp,
	pmApp,
	caApp,
	clApp,
	mcgApp,
	ccApp,
} from "./pseudoMethods.js";
import { clipboardCopy } from "./clipboardCopy.js";


let psNumButton = document.querySelector(".psNumButton");

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
				cmApp();
				break;
			case "MC": //Multiplicador Constante
				mcApp();
				break;
			case "PM": //Productos Medios
				pmApp();
				break;
			case "CA": //Congruencial Aditivo
				caApp();
				break;
			case "CL": //Congruencial Lineal
				clApp();
				break;
			case "MCG": //Congruencial Multiplicativo
				mcgApp();
				break;
			case "CC": //Congruencial Cuadratico
				ccApp();
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


clipboardCopy();

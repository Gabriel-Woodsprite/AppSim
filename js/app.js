
import { cmApp, mcAPP, pmApp, caApp, clApp, mcgAPP, ccAppm } from "./pseudoMethods.js";
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
			case "CM": // Cuadrados Medios
				cmApp();
				break;
			case "MC": // Multiplicador Constante
				mcAPP();
				break;
			case "PM": // Productos Medios
				pmApp();
				break;
			case "CA": // Congruencial Aditivo
				caApp();
				break;
			case "CL": // Congruencial Lineal
				clApp();
				break;
			case "MCG": // Congruencial Multiplicativo
				mcgAPP();
				break;
			case "CC": // Congruencial Cuadrático
				ccAppm();
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

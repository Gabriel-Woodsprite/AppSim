import { mcgAPP } from "./pseudoMethods.js";
import { clipboardCopy } from "./clipboardCopy.js";

let psNumButton = document.querySelector(".psNumButton");

psNumButton.addEventListener("click", () => {
	if (getCheckedRadio().length !== 0) {
		const section = document.getElementById("resultSection");
		section.classList.remove("hidden");
		section.classList.add("notHidden");

		// Mover la página hasta el final completamente
		setTimeout(() => {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: "smooth",
			});
		}, 100); // pequeño delay para que aparezca la sección primero

		switch (getCheckedRadio()) {
			case "CM": //Cuadrados Medios
				cmAPP();
				break;
			case "MC": //Multiplicador Constante
				mcAPP();
				break;
			case "PM": //Productos Medios
				pmAPP();
				break;
			case "CA": //Congruencial Aditivo
				caAPP();
				break;
			case "CL": //Congruencial Lineal
				clAPP();
				break;
			case "MCG": //Congruencial Multiplicativo
				mcgAPP();
				break;
			case "CC": //Congruencial Cuadratico
				ccAPP();
				break;

			default:
				break;
		}
	}
});

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

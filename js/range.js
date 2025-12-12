// Selecciona todos los sliders que tengan un span asociado mediante el atributo data-display
document
	.querySelectorAll('input[type="range"][data-display]')
	.forEach(slider => {
		// ID del span que mostrará el valor
		const displayId = slider.getAttribute("data-display");
		const displayElement = document.getElementById(`${displayId}`);

		// Valor inicial
		displayElement.textContent = slider.value;

		// Actualización dinámica
		slider.addEventListener("input", () => {
			displayElement.textContent = slider.value;
		});
	});

export function fillTable(values, htmlClass = null) {
	const tbody = document.querySelector(
		htmlClass == null
			? ".table-retro tbody"
			: `.${htmlClass} .table-retro tbody`,
	);
	console.log(tbody);
	tbody.innerHTML = "";

	// Detectar si la tabla es MCG (semillas + ui)
	const isMCG = Array.isArray(values.seeds) && Array.isArray(values.ui);

	if (isMCG) {
		// ----------- TABLA MCG -----------

		for (let i = 0; i < 10; i++) {
			const tr = document.createElement("tr");

			tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${values.seeds[i]}</td>
                <td>${values.ui[i].toFixed(5)}</td>
            `;

			tbody.appendChild(tr);
		}
	} else if (Array.isArray(values)) {
		// ----------- TABLA CONVOLUCIÓN -----------
		values.forEach((v, i) => {
			const tr = document.createElement("tr");

			tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${v.toFixed(5)}</td>
            `;

			tbody.appendChild(tr);
		});
	}
}

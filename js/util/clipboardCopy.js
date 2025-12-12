// import { mcgUi } from "./pseudoMethods.js";

// export function clipboardCopy() {
// 	let array = {};
// 	// función de copiado
// 	function copiarPrimeros(n) {
// 		const subset = array.slice(0, n);

// 		const texto = subset.join("\n"); // saltos de línea → perfecto para Excel

// 		navigator.clipboard.writeText(texto).catch(err => {
// 			console.error("Error al copiar", err);
// 		});
// 	}

// 	// asignar evento a todos los botones
// 	document.addEventListener("DOMContentLoaded", () => {
// 		const botones = document.querySelectorAll(".copyBtn");

// 		console.log(botones);
// 		botones.forEach(btn => {
// 			btn.addEventListener("click", () => {
// 				array = mcgUi;
// 				const cantidad = parseInt(btn.dataset.count);
// 				copiarPrimeros(cantidad);
// 			});
// 		});
// 	});
// }

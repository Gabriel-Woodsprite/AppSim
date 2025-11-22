import { fillTable } from "./fillTable.js";

let ui = [];

function cmApp() {}
function mcAPP() {}
function cmApp() {}
function pmApp() {}
function caApp() {}
function clApp() {}
function mcgAPP() {
	fillTable(getMCG(Date.now(), 100));
}
function ccAppm() {}

function getMCG(seed, iterations) {
	const a = 1664525; // Buena constante usada por glibc
	const c = 1013904223; // Para mejorar el periodo
	const m = 2 ** 32; // Módulo estándar

	let x = seed;
	let seeds = [];

	for (let i = 0; i < iterations; i++) {
		x = (a * x + c) % m;
		seeds.push(x);
		ui.push(x / m); // Normalizado 0–1
	}

	return { seeds, ui };
}

export { getMCG, ui };
export { cmApp, mcAPP, pmApp, caApp, clApp, mcgAPP, ccAppm };

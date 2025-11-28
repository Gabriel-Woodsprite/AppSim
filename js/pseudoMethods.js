import { fillTable } from "./fillTable.js";

let mcgUi = [];

function getMiddleDigits(num, digits = 4) {
	let str = num.toString();
	while (str.length < digits) str = "0" + str; // rellena si es muy corto
	const start = Math.floor((str.length - digits) / 2);
	return parseInt(str.substr(start, digits));
}

function cmApp(seed = Date.now(), n = 10) {
	// Cuadrados Medios
	let results = [];
	let seeds = [];
	let current = seed;

	for (let i = 0; i < n; i++) {
		let squared = current * current;
		seeds.push(squared);
		let mid = getMiddleDigits(squared);
		results.push(parseFloat("0." + mid));
		current = mid;
	}

	const obj = { seeds, ui: results };
	fillTable(obj);
	return obj;
}

function mcApp(seed = Date.now(), constant = 5, n = 10) {
	// Multiplicador Constante
	let results = [];
	let seeds = [];
	let current = seed;

	for (let i = 0; i < n; i++) {
		let mult = current * constant;
		seeds.push(mult);
		let mid = getMiddleDigits(mult);
		results.push(parseFloat("0." + mid));
		current = mid;
	}

	const obj = { seeds, ui: results };
	fillTable(obj);
	return obj;
}

function pmApp(s1 = Date.now(), s2 = 5678, n = 10) {
	// Productos Medios
	let results = [];
	let seeds = [];
	let current1 = s1;
	let current2 = s2;

	for (let i = 0; i < n; i++) {
		let prod = current1 * current2;
		seeds.push(prod);
		let mid = getMiddleDigits(prod);
		results.push(parseFloat("0." + mid));
		current1 = current2;
		current2 = mid;
	}

	const obj = { seeds, ui: results };
	fillTable(obj);
	return obj;
}
//---

function caApp(s1 = 0.1234, s2 = 0.5678, n = 10) {
	// Congruencial Aditivo
	let results = [];
	let seeds = [s1, s2];

	for (let i = 0; i < n; i++) {
		let next = (seeds[seeds.length - 1] + seeds[seeds.length - 2]) % 1;
		results.push(next);
		seeds.push(next);
	}

	const obj = { seeds, ui: results };
	fillTable(obj);
	return obj;
}
//Lineal

function clApp(s1 = 0.1234, s2 = 0.5678, n = 10) {
    let results = [];
    let seeds = [s1, s2];

    let a = s1;    // multiplicador tomado de la primera semilla
    let x = s2;    // valor inicial tomado de la segunda semilla

    for (let i = 0; i < n; i++) {
        x = (a * x) % 1; // fórmula congruencial lineal real
        results.push(x);
        seeds.push(x);
    }

    const obj = { seeds, ui: results };
    fillTable(obj);
    return obj;
}

function mcgApp() {
	let values = getMCG(Date.now(), 100);
	mcgUi = values.ui;
	fillTable(values);
}
function ccApp(seed = Date.now(), n = 10) {
	let results = [];
	let seeds = [];
	let current = seed;

	for (let i = 0; i < n; i++) {
		let squared = current * current;
		seeds.push(squared);

		let mid = getMiddleDigits(squared);
		results.push(parseFloat("0." + mid));

		current = mid;
	}

	const obj = { seeds, ui: results };
	fillTable(obj);
	return obj;
}

function getMCG(seed, iterations) {
	const a = 1664525; // Buena constante usada por glibc
	const c = 1013904223; // Para mejorar el periodo
	const m = 2 ** 32; // Módulo estándar

	let x = seed;
	let seeds = [];
	let ui = [];

	for (let i = 0; i < iterations; i++) {
		x = (a * x + c) % m;
		seeds[i] = x;
		ui[i] = x / m; // Normalizado 0–1
	}

	return { seeds, ui };
}

export { getMCG, mcgUi };
export { cmApp, mcApp, pmApp, caApp, clApp, mcgApp, ccApp };

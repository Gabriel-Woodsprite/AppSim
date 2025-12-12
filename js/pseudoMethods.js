import { fillTable } from "./util/fillTable.js";

/* ============================
   🔹 Funciones Auxiliares
=============================== */

function getMiddleDigits(num, digits = 4) {
	let str = num.toString();
	while (str.length < digits) str = "0" + str;
	const start = Math.floor((str.length - digits) / 2);
	return parseInt(str.substr(start, digits));
}

/* ============================
   🔹 Métodos getXXX() puros
=============================== */

function getCM(seed = Date.now(), n = 100) {
	const m = 2 ** 32;
	let results = [];
	let seeds = [];
	let x = seed >>> 0; // aseguramos 32 bits

	for (let i = 0; i < n; i++) {
		let sq = (x * x) >>> 0;

		// tomar 6 dígitos centrales, no 4
		let mid = getMiddleDigits(sq, 6);

		// mezcla extra
		x = (mid ^ (sq >>> 5) ^ (x << 3)) >>> 0;

		seeds.push(x);
		results.push(x / m);
	}
	return { seeds, ui: results };
}

function getMC(seed = Date.now(), constant = 37, n = 100) {
	const m = 2 ** 32;
	let results = [];
	let seeds = [];
	let x = seed >>> 0;

	for (let i = 0; i < n; i++) {
		let mult = (x * constant) >>> 0;
		let mid = getMiddleDigits(mult, 6);

		x = (mid + mult + (x << 5)) >>> 0;

		seeds.push(x);
		results.push(x / m);
	}

	return { seeds, ui: results };
}

function getPM(s1 = Date.now(), s2 = performance.now(), n = 100) {
	const m = 2 ** 32;

	let x = s1 >>> 0;
	let y = s2 >>> 0;

	let seeds = [];
	let results = [];

	for (let i = 0; i < n; i++) {
		let prod = (x * y) >>> 0;

		let mid = getMiddleDigits(prod, 6);

		// mezcla
		let next = (mid ^ (prod >>> 7) ^ (x << 2) ^ (y << 3)) >>> 0;

		seeds.push(next);
		results.push(next / m);

		x = y;
		y = next;
	}

	return { seeds, ui: results };
}
//Lineal

function getCA(s1 = Math.random(), s2 = Math.random(), n = 100) {
	let seeds = [s1, s2];
	let results = [];

	for (let i = 0; i < n; i++) {
		let next = (seeds.at(-1) + seeds.at(-2) + Math.random() * 0.000001) % 1;

		results.push(next);
		seeds.push(next);
	}

	return { seeds, ui: results };
}

function getCL(
	seed = Date.now(),
	a = 1664525,
	c = 1013904223,
	m = 2 ** 32,
	n = 100,
) {
	let x = seed >>> 0;
	let results = [];
	let seeds = [];

	for (let i = 0; i < n; i++) {
		x = (a * x + c) % m;

		// mezcla XOR extra
		x = (x ^ (x >>> 13) ^ (x << 7)) >>> 0;

		seeds.push(x);
		results.push(x / m);
	}

	return { seeds, ui: results };
}

function getMCG(seed = Date.now(), iterations = 100) {
	const a = 1664525;
	const m = 2 ** 32;

	let x = seed >>> 0;
	let seeds = [];
	let ui = [];

	for (let i = 0; i < iterations; i++) {
		x = (a * x) % m;

		// whitening (mezcla)
		x = (x ^ (x >>> 16)) >>> 0;

		seeds.push(x);
		ui.push(x / m);
	}

	return { seeds, ui };
}

function getCC(seed = Date.now(), n = 100) {
	const m = 2 ** 32;
	let results = [];
	let seeds = [];
	let x = seed >>> 0;

	for (let i = 0; i < n; i++) {
		let sq = (x * x) >>> 0;

		let mid = getMiddleDigits(sq, 6);

		x = (mid + (sq >>> 8) + (x << 4)) >>> 0;

		seeds.push(x);
		results.push(x / m);
	}

	return { seeds, ui: results };
}

/* ============================
   🔹 Función ÚNICA para llenar tabla
=============================== */

function renderMetodo(methodFunction, ...args) {
	const result = args.length > 0 ? methodFunction(...args) : methodFunction();
	fillTable(result);
	return result;
}

/* ============================
   🔹 Exports
=============================== */

export { getCM, getMC, getPM, getCA, getCL, getMCG, getCC, renderMetodo };

import { transformadaInversa, convolucion, composicion } from "./varMethods.js";
import { getKs } from "./test/prTest.js";
let btnTi = document.querySelector(".btn-TI");
let btnTItest = document.querySelector(".btn-TI-test");

let btnConv = document.querySelector(".btn-CONV");
let btnCONVtest = document.querySelector(".btn-CONV-test");

let btnComp = document.querySelector(".btn-CMP");
let btnCMPtest = document.querySelector(".btn-CMP-test");

btnTi.addEventListener("click", e => {
	e.preventDefault();
	let lambda = Number(document.querySelector(".lambda").value);
	let variablesRange = Number(document.querySelector(".range-TI").value);

	transformadaInversa(lambda, variablesRange);
});
btnTItest.addEventListener("click", e => {
	e.preventDefault();
	
});

btnConv.addEventListener("click", e => {
	e.preventDefault();
	let sigma = Number(document.querySelector(".sigma").value);
	let mu = Number(document.querySelector(".mu").value);
	let variablesRange = Number(document.querySelector(".variablesRange").value);

	convolucion(sigma, mu, variablesRange);
});
btnCONVtest.addEventListener("click", e => {
	e.preventDefault();
});

btnComp.addEventListener("click", e => {
	e.preventDefault();
	let probabilidad = document.querySelector(".probabilidad").value;
	let lambda = document.querySelector(".lambda-comp").value;
	let generatedRange = document.querySelector(".range-COMP").value;

	composicion(probabilidad, lambda, generatedRange);
});
btnCMPtest.addEventListener("click", e => {
	e.preventDefault();
});

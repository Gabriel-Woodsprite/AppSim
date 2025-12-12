import {
	transformadaInversa,
	convolucion,
	composicion,
	cdfExponencial,
	cdfNormal,
	cdfComposicion,
} from "./varMethods.js";
import { getKs, getKsGeneral } from "./test/prTest.js";
let btnTi = document.querySelector(".btn-TI");
let btnTItest = document.querySelector(".btn-TI-test");

let btnConv = document.querySelector(".btn-CONV");
let btnCONVtest = document.querySelector(".btn-CONV-test");

let btnComp = document.querySelector(".btn-CMP");
let btnCMPtest = document.querySelector(".btn-CMP-test");

let tiData = {
	ui: [],
	xi: [],
	lambda: 0,
};

let convolucionData = {};
let composicionData = {};

btnTi.addEventListener("click", e => {
	e.preventDefault();
	let lambda = Number(document.querySelector(".lambda").value);
	let variablesRange = Number(document.querySelector(".range-TI").value);

	tiData = transformadaInversa(lambda, variablesRange);
});
btnConv.addEventListener("click", e => {
	e.preventDefault();
	let sigma = Number(document.querySelector(".sigma").value);
	let mu = Number(document.querySelector(".mu").value);
	let variablesRange = Number(document.querySelector(".variablesRange").value);
	console.log(convolucion(sigma, mu, variablesRange));
	convolucionData = convolucion(sigma, mu, variablesRange);
});

btnComp.addEventListener("click", e => {
	e.preventDefault();
	let probabilidad = Number(document.querySelector(".probabilidad").value);
	let lambda = Number(document.querySelector(".lambda-comp").value);
	let sigma = Number(document.querySelector(".sigma_comp").value);
	let mu = Number(document.querySelector(".mu_comp").value);
	let generatedRange = Number(document.querySelector(".range-COMP").value);

	composicionData = composicion(
		probabilidad,
		lambda,
		generatedRange,
		mu,
		sigma,
	);
});

btnTItest.addEventListener("click", e => {
	e.preventDefault();

	let ks_TI_d = document.querySelector(".ks-TI-D");
	let ks_TI_Dcrit = document.querySelector(".ks-TI-Dcrit");
	let ks_TI_pass = document.querySelector(".ks-TI-pass");

	let bond_TI_d = document.querySelector(".bond-TI-D");
	let bond_TI_dcrit = document.querySelector(".bond-TI-Dcrit");
	let bond_TI_pass = document.querySelector(".bond-TI-pass");

	console.log(tiData.xi);
	let uniformTestR = getKs(tiData.ui);
	let goodnessTestR = getKsGeneral(tiData.xi, cdfExponencial(tiData.lambda));

	ks_TI_d.textContent = uniformTestR.D;
	ks_TI_Dcrit.textContent = uniformTestR.Dcrit;
	ks_TI_pass.textContent = uniformTestR.pass ? "Pasa" : "No pasa";

	bond_TI_d.textContent = goodnessTestR.D;
	bond_TI_dcrit.textContent = goodnessTestR.Dcrit;
	bond_TI_pass.textContent = goodnessTestR.pass ? "Pasa" : "No pasa";
});
btnCONVtest.addEventListener("click", e => {
	e.preventDefault();

	let ksConvD = document.querySelector(".ks-CONV-D");
	let ksConvDcrit = document.querySelector(".ks-CONV-Dcrit");
	let ksConvPass = document.querySelector(".ks-CONV-pass");

	console.log(convolucionData.variableArray);
	let testResult = getKsGeneral(
		convolucionData.variableArray,
		cdfNormal(convolucionData.mu, convolucionData.sigma),
	);

	ksConvD.textContent = testResult.D;
	ksConvDcrit.textContent = testResult.Dcrit;
	ksConvPass.textContent = testResult.pass ? "Pasa" : "No pasa";
});
btnCMPtest.addEventListener("click", e => {
	e.preventDefault();

	let ksCOMPD = document.querySelector(".ks-COMP-D");
	let ksCOMPDcrit = document.querySelector(".ks-COMP-Dcrit");
	let ksCOMPPass = document.querySelector(".ks-COMP-pass");

	console.log(composicionData);
	let testResult = getKsGeneral(
		composicionData.variables,
		cdfComposicion(
			composicionData.p,
			composicionData.lambda,
			composicionData.mu,
			composicionData.sigma,
		),
	);

	ksCOMPD.textContent = testResult.D;
	ksCOMPDcrit.textContent = testResult.Dcrit;
	ksCOMPPass.textContent = testResult.pass ? "Pasa" : "No pasa";
});

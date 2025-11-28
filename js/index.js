// index.js
// Integrador: llama generadores y pruebas existentes

// IMPORTS — asume que los nombres de archivo están en la misma carpeta
import { generarTransformadaInversa } from "./transformadaInversa.js";
import { generarConvolucion } from "./convolucion.js";
import { generarComposicion } from "./composicion.js";

// pruebas (tus archivos)
import {
	ksExponential,
	chiSquareExponential,
	ksUniform,
	chiSquareUniform,
} from "./pruebasTI.js";
import {
	ksNormal,
	chiSquareNormal,
	testMeanNormal,
	testVarianceNormal,
} from "./pruebasConv.js";
import {
	ksExponential as ksCompExp,
	chiSquareExponential as chiCompExp,
} from "./pruebasComp.js";

const methodSelect = document.getElementById("method");
const paramsArea = document.getElementById("params-area");
const runBtn = document.getElementById("run");
const fillBtn = document.getElementById("fillUi");
const output = document.getElementById("output");

// Construcción dinámica de inputs según método
function renderParams() {
	const m = methodSelect.value;
	paramsArea.innerHTML = "";

	if (m === "ti") {
		paramsArea.innerHTML = `
            <label>λ: <input id="ti-lambda" type="number" min="0.0001" step="any" value="2"></label>
            <label>N: <input id="ti-n" type="number" min="10" step="1" value="100"></label>
        `;
	} else if (m === "conv") {
		paramsArea.innerHTML = `
            <label>μ: <input id="conv-mu" type="number" step="any" value="0"></label>
            <label>σ: <input id="conv-sigma" type="number" min="0.0001" step="any" value="1"></label>
            <label>N: <input id="conv-n" type="number" min="10" step="1" value="100"></label>
        `;
	} else if (m === "comp") {
		paramsArea.innerHTML = `
            <label>Prob (%) : <input id="comp-p" type="number" min="0" max="100" step="any" value="70"></label>
            <label>λ: <input id="comp-lambda" type="number" step="any" value="2"></label>
            <label>N: <input id="comp-n" type="number" min="10" step="1" value="100"></label>
        `;
	}
}
methodSelect.addEventListener("change", renderParams);
renderParams(); // initial

// Helper para imprimir resultados en output
function show(obj) {
	output.textContent = JSON.stringify(obj, null, 4);
}

// Ejecutar pruebas según método
runBtn.addEventListener("click", () => {
	const m = methodSelect.value;

	if (m === "ti") {
		const lambda = Number(document.getElementById("ti-lambda").value);
		const n = Number(document.getElementById("ti-n").value);
		const X = generarTransformadaInversa(lambda, n);

		// Ui: regeneramos con MCG interno (ksUniform + chiUniform)
		// Para U_i usamos la relación U_i = 1 - exp(-lambda * X_i) ? No:
		// Mejor: generate Ui directly for transformada tests
		// But we didn't import getMCG here; tests for Ui may be optional.
		// We'll run tests on X and on Ui approximated from generator.
		const results = {};
		results.exponencial = {
			ks: ksExponential(X, lambda),
			chi2: chiSquareExponential(X, lambda, 10),
		};
		// If you want uniformity tests on U, we can re-generate U:
		// Generate U from X: U = 1 - exp(-lambda * X)
		const U_from_X = X.map(x => 1 - Math.exp(-lambda * x));
		results.uniformity_on_U = {
			ks: ksUniform(U_from_X),
			chi2: chiSquareUniform(U_from_X, 10),
		};
		show(results);
	}

	if (m === "conv") {
		const mu = Number(document.getElementById("conv-mu").value);
		const sigma = Number(document.getElementById("conv-sigma").value);
		const n = Number(document.getElementById("conv-n").value);

		const X = generarConvolucion(mu, sigma, n);

		const results = {
			ks: ksNormal(X, mu, sigma),
			chi2: chiSquareNormal(X, mu, sigma, 10),
			meanTest: testMeanNormal(X, mu, sigma),
			varTest: testVarianceNormal(X, sigma),
		};
		show(results);
	}

	if (m === "comp") {
		const p = Number(document.getElementById("comp-p").value);
		const lambda = Number(document.getElementById("comp-lambda").value);
		const n = Number(document.getElementById("comp-n").value);

		const X = generarComposicion(p, lambda, n);

		const results = {
			ks: ksCompExp(X, lambda),
			chi2: chiCompExp(X, lambda, 10),
		};
		show(results);
	}
});

// botón extra para solo generar y mostrar la muestra
fillBtn.addEventListener("click", () => {
	const m = methodSelect.value;
	if (m === "ti") {
		const lambda = Number(document.getElementById("ti-lambda").value);
		const n = Number(document.getElementById("ti-n").value);
		const X = generarTransformadaInversa(lambda, n);
		show({ sample: X.slice(0, 50) });
	} else if (m === "conv") {
		const mu = Number(document.getElementById("conv-mu").value);
		const sigma = Number(document.getElementById("conv-sigma").value);
		const n = Number(document.getElementById("conv-n").value);
		const X = generarConvolucion(mu, sigma, n);
		show({ sample: X.slice(0, 50) });
	} else if (m === "comp") {
		const p = Number(document.getElementById("comp-p").value);
		const lambda = Number(document.getElementById("comp-lambda").value);
		const n = Number(document.getElementById("comp-n").value);
		const X = generarComposicion(p, lambda, n);
		show({ sample: X.slice(0, 50) });
	}
});

// =====================================================
//     PRUEBAS ESTADÍSTICAS PARA TRANSFORMADA INVERSA
//     Distribución Exponencial
// =====================================================

// ----------- 1. KS para UNIFORMIDAD de Ui ------------------
export function ksUniform(U) {
	const n = U.length;
	const sorted = [...U].sort((a, b) => a - b);

	let Dplus = 0;
	let Dminus = 0;

	for (let i = 0; i < n; i++) {
		const F = sorted[i];
		const i_n = (i + 1) / n;

		Dplus = Math.max(Dplus, i_n - F);
		Dminus = Math.max(Dminus, F - i / n);
	}

	const D = Math.max(Dplus, Dminus);
	const D_crit = 1.36 / Math.sqrt(n); // α = 0.05

	return {
		D,
		D_crit,
		passed: D < D_crit,
	};
}

// ----------- 2. Chi-cuadrada para UNIFORMIDAD ------------------
export function chiSquareUniform(U, k = 10) {
	const n = U.length;
	const expected = n / k;
	const counts = Array(k).fill(0);

	for (let u of U) {
		const index = Math.min(Math.floor(u * k), k - 1);
		counts[index]++;
	}

	let chi = 0;
	for (let c of counts) {
		chi += Math.pow(c - expected, 2) / expected;
	}

	const chi_crit = 16.91; // k=10, α=0.05

	return {
		chi,
		chi_crit,
		passed: chi < chi_crit,
	};
}

// -----------------------------------------------------------
//        PRUEBAS PARA LA DISTRIBUCIÓN EXPONENCIAL
// -----------------------------------------------------------

// ------------- 3. KS para EXPONENCIAL -----------------------
export function ksExponential(X, lambda) {
	const n = X.length;
	const sorted = [...X].sort((a, b) => a - b);

	let D = 0;
	for (let i = 0; i < n; i++) {
		const F_exp = 1 - Math.exp(-lambda * sorted[i]); // CDF
		const i_n = (i + 1) / n;
		const diff = Math.abs(i_n - F_exp);

		D = Math.max(D, diff);
	}

	const D_crit = 1.36 / Math.sqrt(n);

	return {
		D,
		D_crit,
		passed: D < D_crit,
	};
}

// ----------- 4. Chi-cuadrada para EXPONENCIAL ----------------
export function chiSquareExponential(X, lambda, k = 10) {
	const n = X.length;

	// Particiones usando cuantiles teóricos
	let limits = [];
	for (let i = 1; i < k; i++) {
		limits.push(-Math.log(1 - i / k) / lambda);
	}

	limits.push(Infinity);

	let counts = Array(k).fill(0);

	for (let x of X) {
		for (let i = 0; i < k; i++) {
			if (x <= limits[i]) {
				counts[i]++;
				break;
			}
		}
	}

	const expected = n / k;

	let chi = 0;
	for (let c of counts) {
		chi += Math.pow(c - expected, 2) / expected;
	}

	const chi_crit = 16.91; // α=0.05, k=10

	return {
		chi,
		chi_crit,
		passed: chi < chi_crit,
	};
}

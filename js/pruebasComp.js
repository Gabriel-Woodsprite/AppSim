// =====================================================
//     PRUEBAS ESTADÍSTICAS PARA COMPOSICIÓN (Exponencial)
// =====================================================

// Reutilizamos exactamente las mismas pruebas que Transformada Inversa

// ----------- 1. KS EXPONENCIAL -------------------
export function ksExponential(X, lambda) {
	const n = X.length;
	const sorted = [...X].sort((a, b) => a - b);

	let D = 0;
	for (let i = 0; i < n; i++) {
		const F_exp = 1 - Math.exp(-lambda * sorted[i]);
		const i_n = (i + 1) / n;
		D = Math.max(D, Math.abs(i_n - F_exp));
	}

	const D_crit = 1.36 / Math.sqrt(n);

	return {
		D,
		D_crit,
		passed: D < D_crit,
	};
}

// ----------- 2. Chi-cuadrada EXPONENCIAL ------------
export function chiSquareExponential(X, lambda, k = 10) {
	const n = X.length;
	let limits = [];

	for (let i = 1; i < k; i++) limits.push(-Math.log(1 - i / k) / lambda);

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

	for (let c of counts) chi += Math.pow(c - expected, 2) / expected;

	const chi_crit = 16.91;

	return {
		chi,
		chi_crit,
		passed: chi < chi_crit,
	};
}

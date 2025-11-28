// =====================================================
//     PRUEBAS ESTADÍSTICAS PARA CONVOLUCIÓN (Normal)
// =====================================================

// ------------- Utilidad: CDF de Normal ------------------
function normalCDF(x, mu, sigma) {
	return 0.5 * (1 + erf((x - mu) / (sigma * Math.sqrt(2))));
}

// ----------- Aproximación de erf ------------------------
function erf(x) {
	const a1 = 0.254829592;
	const a2 = -0.284496736;
	const a3 = 1.421413741;
	const a4 = -1.453152027;
	const a5 = 1.061405429;
	const p = 0.3275911;

	const sign = x < 0 ? -1 : 1;
	x = Math.abs(x);

	const t = 1 / (1 + p * x);
	const y =
		1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

	return sign * y;
}

// -----------------------------------------------------------
//                   KS para NORMAL
// -----------------------------------------------------------
export function ksNormal(X, mu, sigma) {
	const sorted = [...X].sort((a, b) => a - b);
	const n = X.length;

	let D = 0;

	for (let i = 0; i < n; i++) {
		const F = normalCDF(sorted[i], mu, sigma);
		const i_n = (i + 1) / n;
		D = Math.max(D, Math.abs(i_n - F));
	}

	const D_crit = 1.36 / Math.sqrt(n);

	return {
		D,
		D_crit,
		passed: D < D_crit,
	};
}

// -----------------------------------------------------------
//                   CHI CUADRADA NORMAL
// -----------------------------------------------------------
export function chiSquareNormal(X, mu, sigma, k = 10) {
	const n = X.length;

	let limits = [];
	for (let i = 1; i < k; i++) {
		const q = mu + sigma * Math.sqrt(2) * erfinv((2 * i) / k - 1);
		limits.push(q);
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

	for (let c of counts) chi += Math.pow(c - expected, 2) / expected;

	const chi_crit = 16.91;

	return { chi, chi_crit, passed: chi < chi_crit };
}

// -------- erfinv approximation -----------------
function erfinv(x) {
	const a = 0.147;
	return (
		Math.sign(x) *
		Math.sqrt(
			Math.sqrt(
				Math.pow(2 / (Math.PI * a) + Math.log(1 - x * x), 2) -
					Math.log(1 - x * x) / a,
			) -
				(2 / (Math.PI * a) + Math.log(1 - x * x)),
		)
	);
}

// -----------------------------------------------------------
//           Prueba de MEDIA (Z test)
// -----------------------------------------------------------
export function testMeanNormal(X, mu, sigma) {
	const n = X.length;
	const mean = X.reduce((a, b) => a + b) / n;

	const Z = (mean - mu) / (sigma / Math.sqrt(n));
	const Zcrit = 1.96;

	return {
		mean,
		Z,
		Zcrit,
		passed: Math.abs(Z) < Zcrit,
	};
}

// -----------------------------------------------------------
//           Prueba de VARIANZA (Chi²)
// -----------------------------------------------------------
export function testVarianceNormal(X, sigma) {
	const n = X.length;
	const mean = X.reduce((a, b) => a + b) / n;

	const variance = X.reduce((s, x) => s + Math.pow(x - mean, 2), 0) / (n - 1);

	const chi = ((n - 1) * variance) / (sigma * sigma);

	const chi_low = 73.36; // para n=100 (ejemplo)
	const chi_high = 128.42;

	return {
		variance,
		chi,
		passed: chi > chi_low && chi < chi_high,
	};
}

// Función auxiliar: extrae 4 dígitos centrales y devuelve 0.xxxx
function middle4(num) {
    let s = Math.abs(Math.trunc(num)).toString(); // quitar decimales
    while (s.length < 8) { // rellenar ceros a la izquierda si faltan
        s = '0' + s;
    }
    const mid = s.substring(2, 6); // tomar 4 dígitos centrales
    return Number('0.' + mid);     // convertir a decimal
}

// Método que genera N números cuadrados medios
function cuadradosMediosN(semilla, cantidad) {
    let x = semilla;
    const resultados = [];
    for (let i = 0; i < cantidad; i++) {
        x = middle4(x * x) * 10000; // convertir a entero para la siguiente iteración
        resultados.push(x / 10000); // guardar decimal
    }
    return resultados;
}

// Método que genera N números multiplicador constante
function multiplicadorConstanteN(semilla, constante, cantidad) {
    let x = semilla;
    const resultados = [];
    for (let i = 0; i < cantidad; i++) {
        x = middle4(x * constante) * 10000;
        resultados.push(x / 10000);
    }
    return resultados;
}

// Método que genera N números productos medios
function productosMediosN(s1, s2, cantidad) {
    let x = s1;
    let y = s2;
    const resultados = [];
    for (let i = 0; i < cantidad; i++) {
        let mid = middle4(x * y) * 10000;
        resultados.push(mid / 10000);
        x = y;
        y = mid * 10000; // importante: mantener consistencia como entero
    }
    return resultados;
}

// ---- Función para mostrar resultados en tabla ----
function mostrarEnTabla(resultados) {
    const tbody = document.getElementById("resultadoTabla").querySelector("tbody");
    tbody.innerHTML = ""; // limpiar tabla
    resultados.forEach((num, index) => {
        const row = document.createElement("tr");
        const cellIndex = document.createElement("td");
        const cellValor = document.createElement("td");
        cellIndex.textContent = index + 1;
        cellValor.textContent = num.toFixed(4); // mostrar 4 decimales
        row.appendChild(cellIndex);
        row.appendChild(cellValor);
        tbody.appendChild(row);
    });
}

// ---- Eventos de botones ----
document.getElementById("btnCuadradosMedios").addEventListener("click", () => {
    let semilla = Number(document.getElementById("semillaInput").value);
    let cantidad = Number(document.getElementById("cantidadInput").value);
    if (!semilla || semilla <= 0) { alert("Ingresa una semilla válida."); return; }
    let resultados = cuadradosMediosN(semilla, cantidad);
    mostrarEnTabla(resultados);
});

document.getElementById("btnMultiplicadorConstante").addEventListener("click", () => {
    let semilla = Number(document.getElementById("semillaInput").value);
    let constante = Number(document.getElementById("constanteInput").value);
    let cantidad = Number(document.getElementById("cantidadInput").value);
    if (!semilla || !constante || semilla <= 0 || constante <= 0) { alert("Ingresa valores válidos."); return; }
    let resultados = multiplicadorConstanteN(semilla, constante, cantidad);
    mostrarEnTabla(resultados);
});

document.getElementById("btnProductosMedios").addEventListener("click", () => {
    let s1 = Number(document.getElementById("semillaInput").value);
    let s2 = Number(document.getElementById("semilla2Input").value);
    let cantidad = Number(document.getElementById("cantidadInput").value);
    if (!s1 || !s2 || s1 <= 0 || s2 <= 0) { alert("Ingresa semillas válidas."); return; }
    let resultados = productosMediosN(s1, s2, cantidad);
    mostrarEnTabla(resultados);
});

const rangeInput = document.getElementById("myRange");
const rangeValueDisplay = document.getElementById("rangeValue");

// Set initial display value
rangeValueDisplay.textContent = rangeInput.value;

// Update display value on input
rangeInput.addEventListener("input", () => {
	rangeValueDisplay.textContent = rangeInput.value;
});

const variableRange = document.getElementById("variablesRange");
const variablesRangeDisplay = document.getElementById("variableValue");

// Set initial display value
variablesRangeDisplay.textContent = variableRange.value;

// Update display value on input
variableRange.addEventListener("input", () => {
	variablesRangeDisplay.textContent = variableRange.value;
});

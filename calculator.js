document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    initCalculator();
});

function initCalculator() {

    var quantityInput = document.getElementById("quantity");
    var productSelect = document.getElementById("product");
    var calcButton = document.getElementById("calcBtn");
    var resultDiv = document.getElementById("result");
    
    calcButton.addEventListener("click", handleCalculate);
    quantityInput.addEventListener("input", handleInputValidation);
    productSelect.addEventListener("change", handleProductChange);

    handleCalculate();
}

function handleCalculate() {
    var quantityInput = document.getElementById("quantity");
    var quantityValue = quantityInput.value;
    
    if (!isValidInput(quantityValue)) {
        quantityInput.classList.add("error");
        document.getElementById("result").innerHTML = "Ошибка: введите число";
        return;
    }
    
    quantityInput.classList.remove("error");
    var quantity = parseInt(quantityValue, 10);
    var price = document.getElementById("product").value;
    var total = quantity * price;
    var resultText = "Стоимость: " + total.toLocaleString() + " ₽";
    document.getElementById("result").innerHTML = resultText;
}

function handleInputValidation(event) {
    var input = event.target;
    if (!isValidInput(input.value)) {
        input.classList.add("error");
    } else {
        input.classList.remove("error");
    }
}

function handleProductChange() {
    handleCalculate();
}

function isValidInput(value) {
    var regex = /^[0-9]+$/;
    return regex.test(value);
}

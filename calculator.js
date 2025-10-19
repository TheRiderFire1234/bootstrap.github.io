document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    initCalculator();
});

function initCalculator() {
    var quantityInput = document.getElementById("quantity");
    var productSelect = document.getElementById("product");
    var calcButton = document.getElementById("calcBtn");
    var extraOptionsDiv = document.getElementById("extraOptions");
    var extraCheckboxDiv = document.getElementById("extraCheckbox");

    calcButton.addEventListener("click", handleCalculate);
    quantityInput.addEventListener("input", handleInputValidation);
    productSelect.addEventListener("change", handleProductChange);

    updateExtraVisibility(productSelect.value);
    handleCalculate();
}

function handleCalculate() {
    var quantityInput = document.getElementById("quantity");
    var quantityValue = quantityInput.value;
    
    if (!isValidInput(quantityValue)) {
        quantityInput.classList.add("error");
        document.getElementById("result").textContent = "Ошибка: введите число";
        return;
    }
    
    quantityInput.classList.remove("error");
    
    var quantity = parseInt(quantityValue, 10);
    var basePrice = parseInt(document.getElementById("product").value, 10);
    var extraPrice = 0;

    // Доп. услуги для Товара 2 (радиокнопки)
    if (basePrice === 2000) {
        var selectedExtra = document.querySelector('input[name="extra"]:checked');
        if (selectedExtra) {
            extraPrice += parseInt(selectedExtra.value, 10);
        }
    }

    // Доп. свойства для Товара 3 (чекбоксы)
    if (basePrice === 3000) {
        var checkboxes = document.querySelectorAll('.extra-checkbox:checked');
        checkboxes.forEach(function(checkbox) {
            extraPrice += parseInt(checkbox.dataset.price, 10);
        });
    }

    var total = (basePrice + extraPrice) * quantity;
    var resultText = "Стоимость: " + total.toLocaleString() + " ₽";
    document.getElementById("result").textContent = resultText;
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
    var productSelect = document.getElementById("product");
    updateExtraVisibility(productSelect.value);
    handleCalculate();
}

function updateExtraVisibility(productId) {
    var extraOptionsDiv = document.getElementById("extraOptions");
    var extraCheckboxDiv = document.getElementById("extraCheckbox");

    extraOptionsDiv.style.display = "none";
    extraCheckboxDiv.style.display = "none";

    if (productId === "2000") {
        extraOptionsDiv.style.display = "block";
    } else if (productId === "3000") {
        extraCheckboxDiv.style.display = "block";
    }
}

function isValidInput(value) {
    var regex = /^[0-9]+$/;
    return regex.test(value);
}

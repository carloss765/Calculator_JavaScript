// Variables globales
let displayValue = '';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

// Función para escribir números en la pantalla
function writenumber(number) {
    const displayTextarea = document.getElementById('display_textarea');

    if (waitingForSecondOperand) {
        displayValue = number.toString();
        waitingForSecondOperand = false;
    } else {
        // Si el valor actual es 0, reemplazarlo, de lo contrario añadir el número
        displayValue = displayValue === '0' ? number.toString() : displayValue + number.toString();
    }

    displayTextarea.value = displayValue;
}

// Función para escribir el punto decimal
function writedecimal(dot) {
    // Si estamos esperando el segundo operando, empezar con "0."
    if (waitingForSecondOperand) {
        displayValue = '0.';
        waitingForSecondOperand = false;
        document.getElementById('display_textarea').value = displayValue;
        return;
    }

    // Si no hay punto decimal ya en el display, añadirlo
    if (!displayValue.includes('.')) {
        displayValue += dot;
        document.getElementById('display_textarea').value = displayValue;
    }
}

// Función para manejar operaciones
function writeoperation(op) {
    const displayTextarea = document.getElementById('display_textarea');
    const inputValue = parseFloat(displayValue);

    // Operaciones especiales que no requieren segundo operando
    if (op === 'sqrt') {
        if (inputValue >= 0) {
            displayValue = Math.sqrt(inputValue).toString();
            displayTextarea.value = displayValue;
        } else {
            displayValue = 'Error';
            displayTextarea.value = displayValue;
        }
        return;
    }

    // Si ya tenemos un operador pendiente, realizar la operación anterior
    if (operator && !waitingForSecondOperand) {
        const result = performCalculation();
        displayValue = result.toString();
        displayTextarea.value = displayValue;
    }

    // Guardar el primer operando y el operador
    firstOperand = parseFloat(displayValue);
    operator = op;
    waitingForSecondOperand = true;
}

// Función para realizar el cálculo
function performCalculation() {
    const secondOperand = parseFloat(displayValue);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                return 'Error';
            }
            result = firstOperand / secondOperand;
            break;
        case '%':
            result = (firstOperand * secondOperand) / 100;
            break;
        case '^':
            result = Math.pow(firstOperand, 2);
            break;
        default:
            return secondOperand;
    }

    // Redondear para evitar problemas de precisión con decimales
    return Math.round(result * 1000000) / 1000000;
}

// Función para el botón igual
function equals() {
    if (!operator || waitingForSecondOperand) {
        return;
    }

    const result = performCalculation();
    displayValue = result.toString();
    document.getElementById('display_textarea').value = displayValue;

    // Resetear para la próxima operación
    firstOperand = result;
    waitingForSecondOperand = true;
    operator = null;
}

// Función para limpiar la pantalla
function cleardisplay() {
    displayValue = '0';
    firstOperand = null;
    waitingForSecondOperand = false;
    operator = null;
    document.getElementById('display_textarea').value = displayValue;
}

// Inicializar la pantalla con 0 al cargar
window.onload = function() {
    document.getElementById('display_textarea').value = '0';
    displayValue = '0';
};



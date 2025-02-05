let currentExpression = '';
let history = [];
const MAX_DISPLAY_LENGTH = 15;

function updateDisplay() {
    const displayValue = currentExpression || '0';
    document.getElementById('result').textContent = displayValue.slice(0, MAX_DISPLAY_LENGTH);
    document.getElementById('history').textContent = history.join(' ');
}

function addNumber(num) {
    if (currentExpression.length >= MAX_DISPLAY_LENGTH) return;
    if (currentExpression === '0' && num !== '.') currentExpression = '';
    if (num === '.' && currentExpression.includes('.')) return;
    currentExpression += num;
    updateDisplay();
}

function addOperation(op) {
    if (currentExpression === '' && op !== '-' && !['sin(', 'cos(', 'tan(', 'sqrt('].includes(op)) return;
    if (currentExpression !== '') {
        history.push(currentExpression);
    }
    history.push(op);
    currentExpression = '';
    updateDisplay();
}

function clear() {
    currentExpression = '';
    history = [];
    updateDisplay();
}

function calculate() {
    try {
        if (currentExpression !== '') {
            history.push(currentExpression);
        }
        const expression = history.join('');
        const result = evaluateExpression(expression);
        currentExpression = String(result);
        history = [];
        updateDisplay();
    } catch (error) {
        currentExpression = 'Error';
        history = [];
        updateDisplay();
    }
}

function evaluateExpression(expression) {
    // Replace scientific functions with Math equivalents
    expression = expression
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/π/g, 'Math.PI');
    
    // Safe evaluation using Function constructor
    return Function('"use strict";return (' + expression + ')')();
}

// Initialize calculator
clear();
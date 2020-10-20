class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    };

    clear() {
        this.readyToReset = false;
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
        this.currentOperandTextElement.style.color = '#FFF';
        this.currentOperandTextElement.style.fontSize = '2.5rem';
    };

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    };

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    };

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.prevOperand !== '') {
            this.compute();
        };
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
    };

    plusMinus() {
        this.currentOperand = this.currentOperand * -1;
    }

    compute() {
        let result;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+':
                if(prev % 1 !== 0 || current % 1 !== 0) {
                    result = parseFloat((prev + current).toFixed(10))
                }
                else {
                    result = prev + current
                }
                break;
            case '-':
                if(prev % 1 !== 0 || current % 1 !== 0) {
                    result = parseFloat((prev - current).toFixed(10))
                }
                else {
                    result = prev - current
                }
                    break;
            case 'x':
                result = parseFloat((prev * current).toFixed(10))
                break;
            case '÷':
                result = parseFloat((prev / current).toFixed(10))
                break;
            case '^':
                if(prev % 1 !== 0 || current % 1 !== 0) {
                    result = parseFloat((Math.pow(prev, current)).toFixed(10));
                }
                else if(current < 0) {
                    result = parseFloat((Math.pow(prev, current)).toFixed(10))
                }
                else {
                    result = Math.pow(prev, current);
                };
                break;
            default:
                return result
        };
        this.readyToReset = true;
        this.currentOperand = result;
        this.operation = undefined;
        this.prevOperand = '';
    };

    sqrt() {
        if(this.currentOperand < 0) {
            this.currentOperandTextElement.style.color = 'red';
            this.currentOperandTextElement.style.fontSize = '1.8rem';
            this.currentOperandTextElement.innerText = 'Error! Click AC to continue.'
        }
        else {
            this.currentOperand = parseFloat((Math.sqrt(this.currentOperand)).toFixed(10));
            this.updateDisplay();
        };
    };

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const intDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let intDisplay;
        if(isNaN(intDigits)) {
            intDisplay = ''
        }
        else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        };
        if(decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`
        }
        else {
            return intDisplay
        };
    };

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.prevOperandTextElement.innerText =
            `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        }
        else {
            this.prevOperandTextElement.innerText = ''
        };
    };
};


const numberButtons = document.querySelectorAll('button.number');
const operationButtons = document.querySelectorAll('button.operation');
const sqrtButton = document.querySelector('button.sqrt-operation');
const plusMinusButton = document.querySelector('button.plus-minus-operation');
const equalsButton = document.querySelector('button.equals');
const deleteButton = document.querySelector('button.delete');
const clearButton = document.querySelector('button.clear');
const prevOperandTextElement = document.querySelector('div.prev-operand');
const currentOperandTextElement = document.querySelector('div.current-operand');

const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.prevOperand === '' && calculator.currentOperand !== '' && calculator.readyToReset) {
            calculator.currentOperand = '';
            calculator.readyToReset = false;
        };
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

sqrtButton.addEventListener('click', button => {
        calculator.sqrt();
});

plusMinusButton.addEventListener('click', button => {
    calculator.plusMinus();
    calculator.updateDisplay();
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
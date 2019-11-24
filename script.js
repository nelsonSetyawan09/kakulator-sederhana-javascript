const buttonNumbers = document.querySelectorAll('[data-number]');
const buttonOperations = document.querySelectorAll('[data-operation');
const buttonEqual = document.querySelector('[data-equal]');
const buttonCurrentDelete = document.querySelector('[data-delete]');
const buttonAllDelete = document.querySelector('[data-all-delete]');
const showOuputPrevious = document.querySelector('[data-ouput-previous]');
const showOutputCurrent = document.querySelector('[data-ouput-current]');

class Calculator{

    constructor(outputPreviousElement, ouputCurrentElement){
        this.outputPreviousElement = outputPreviousElement;
        this.ouputCurrentElement = ouputCurrentElement;
        this.outputCurrentNumber = '';
        this.outputPreviousNumber = '';
        this.operation=undefined
        this.allDelete();
    }

    allDelete(){
        this.outputPreviousElement.innerText = '';
        this.ouputCurrentElement.innerText = '';
        this.outputCurrentNumber = '';
        this.outputPreviousNumber = '';
        this.operation=undefined;
    }

    currentDelete(){
        this.ouputCurrentElement.innerText = '';
        this.outputCurrentNumber = '';
    }

    addNumber(number){
        if (number === '.' && this.outputCurrentNumber.toString().includes('.')) return;
        if(this.outputPreviousNumber === 0) return;

        this.outputPreviousNumber = String(this.outputPreviousNumber)
        if (this.outputPreviousNumber.length >0 && 
                (   !this.outputPreviousNumber.endsWith('-') &&
                    !this.outputPreviousNumber.endsWith('+') &&
                    !this.outputPreviousNumber.endsWith('*') &&
                    !this.outputPreviousNumber.endsWith('/'))
            ) return;

        this.outputCurrentNumber =  this.outputCurrentNumber.toString() + number.toString();
    }

    showUpdate(){
        this.ouputCurrentElement.innerText= this.outputCurrentNumber;
        this.outputPreviousElement.innerText = this.outputPreviousNumber;
    }

    addOperation(operationType){
        this.operation = operationType;
        this.outputPreviousNumber = String(this.outputPreviousNumber)

        if( this.outputPreviousNumber.length >0 && 
            this.outputCurrentNumber.toString().length>0) return;

        if(this.outputPreviousNumber.includes('-') ||
            this.outputPreviousNumber.includes('+') ||
            this.outputPreviousNumber.includes('*') ||
            this.outputPreviousNumber.includes('/')) 
             {
              let changeOperation = this.outputPreviousNumber.split(' ');
              changeOperation[1]=operationType.toString();
              this.outputPreviousNumber = changeOperation.join(' ');
              return
            }
            
        if(this.outputPreviousNumber.length >0 &&  this.outputCurrentNumber.toString().length<=0) {
            this.outputPreviousNumber = this.outputPreviousNumber +' '+ operationType.toString();
            return;
        }

        this.outputPreviousNumber = this.outputCurrentNumber;
        this.outputCurrentNumber= '';
        this.outputPreviousNumber = this.outputPreviousNumber.toString() +' '+ operationType.toString();
    }

    operationResult(){
        let result = 0;
        if(this.outputCurrentNumber.toString().length <=0) return;
        
        let previousNumber= Number.parseFloat(this.outputPreviousNumber);
        let currentNumber = Number.parseFloat(this.outputCurrentNumber);
        
        switch(this.operation) {
            case "-":
                result = previousNumber - currentNumber;
                break;
            case "*":
                    result = previousNumber * currentNumber;
                    break;
            case "+":
                    result = previousNumber + currentNumber;
                    break;
            default:
                    result = previousNumber / currentNumber;
                    break;
        }

        this.operation=undefined;
        if(Number.isNaN(result)) result = 'Infinity';
        this.outputPreviousNumber = result;
        this.outputCurrentNumber='';

        this.showUpdate()
    }
}

const calculator = new Calculator(showOuputPrevious, showOutputCurrent);

buttonNumbers.forEach(btn =>{
    btn.addEventListener('click', () => {
         calculator.addNumber(btn.innerText);
         calculator.showUpdate();
        });
});

buttonOperations.forEach(operand =>{
    operand.addEventListener('click', () => {
        calculator.addOperation(operand.innerText);
        calculator.showUpdate();
    });
});

buttonEqual.addEventListener('click', () => calculator.operationResult());

buttonAllDelete.addEventListener('click', () => calculator.allDelete())

buttonCurrentDelete.addEventListener('click', () => calculator.currentDelete())
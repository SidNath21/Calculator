const display = document.querySelector(".displayMessage");
const equation = document.querySelector(".equation");
const buttons = document.querySelectorAll("button");

let operators = ["÷", "x", "-", "+"];
let canPrint = false;
let lastAnswer = 0;
let firstTime = true;
let operatorButtonColorID = -1;

const calculator = {
    displayValue: "0",
    equationValue: "",
    value1: null,
    value2: null,
    operator: -1, // index of operators []
};

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function(){

        let buttonValue = buttons[i].value;
        let buttonClass = buttons[i].className;
        let buttonID = buttons[i].id;

        if(buttonClass == "number"){

            if(buttonValue == "." && calculator.displayValue.toString().includes(buttonValue)) return;
            if(calculator.operator == -1){
                if(calculator.displayValue == "0") calculator.displayValue =  buttonValue;
                else calculator.displayValue += buttonValue;
            }

            else{
                if(canPrint){
                    canPrint = false;
                    calculator.displayValue = buttonValue;
                }
                else calculator.displayValue += buttonValue;    
            }
               
        }

        if(buttonClass == "operator"){

            
            if(buttonValue != "="){
                
                
                if(buttonValue == "/")  calculator.operator = 0;
                else if(buttonValue == 'x') calculator.operator = 1;
                else if(buttonValue == "-") calculator.operator = 2;
                else if(buttonValue == "+") calculator.operator = 3; 
                calculator.value1 = calculator.displayValue;
                calculator.equationValue = calculator.value1;
                //printAnswer();
                canPrint = true;
                
                
                
            }

            else{
                if(calculator.value1 == null) return;
                calculator.value2 = calculator.displayValue;
                let result = operate(calculator.operator, parseFloat(calculator.value1), parseFloat(calculator.value2));
                calculator.displayValue = result;
                printEquation();
                
            }
       
        }

    

        if(buttonID == "extra"){
            switch(buttonClass){
                case "clear": 
                    reset();
                    break;
                case "sign":
                    changeSign();
                    break;
                case "delete":
                    deleteNum();
                    break;
                default:

            }
            
        }

        print();
        
        
       
    });

}

function reset(){

    calculator.displayValue = "0";
    calculator.equationValue = "";
    calculator.sign = 1;
    calculator.value1 = null;
    calculator.value2 = null;
    calculator.operator = -1;

    equation.textContent = calculator.equationValue;

}

function changeSign(){  
    calculator.displayValue *= -1;  
}

function deleteNum(){

    
    if(calculator.displayValue.toString().length == 1) calculator.displayValue = "0";

    else if (calculator.displayValue.toString().length > 1) {
        calculator.displayValue = calculator.displayValue.toString().slice(0, -1);
    }
        
    
}

function print(){
    if(isNaN(calculator.displayValue)) calculator.displayValue == "ERROR";
    if(calculator.displayValue.toString().length > 9){
        calculator.displayValue = calculator.displayValue.toPrecision(9);
    } 

     display.textContent = calculator.displayValue;
}

function printEquation(){
    equation.textContent = calculator.value1 + " " + operators[calculator.operator] + " " + calculator.value2 + " = ";
}

function printAnswer(){
    equation.textContent = "Ans = " + calculator.equationValue;
}

function operate(operator, a, b){

    let result = 0;
    if(operator == -1) return;

    if(operator == 0) result = divide(a, b);
    else if(operator == 1) result = multiply(a, b);
    else if(operator == 2) result = subtract(a, b);
    else if(operator == 3) result = add(a, b);

    return result;
    

}

function divide(a, b){ return a/b; }
function multiply(a, b){ return a*b; }
function subtract(a, b){ return a-b; }
function add(a, b){ return a+b; }


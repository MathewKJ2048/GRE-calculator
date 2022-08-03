class Calculator
{

}


const numberButtons = document.querySelectorAll('[number]');
const operatorButtons = document.querySelectorAll('[operator]');
//const Button = document.querySelector('[]');
const dotButton = document.querySelector('[dot]');
const equalButton = document.querySelector('[equal]');
const MRButton = document.querySelector('[mr]');
const MCButton = document.querySelector('[mc]');
const MplusButton = document.querySelector('[mp]');
const transferButton = document.querySelector('[transfer]');
const CButton = document.querySelector('[clear]');
const CEButton = document.querySelector('[clear-everything]');
const openBracketButton = document.querySelector('[open-bracket]');
const closeBracketButton = document.querySelector('[close-bracket]');
const screenTextElement = document.querySelector('[screen]');

numberButtons.forEach(button => {
    button.addEventListener('click',()=>
    {
        screenTextElement.innerText = button.innerText;
    }
    )
});
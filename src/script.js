class Calculator
{
    constructor(screenTextElement)
    {
        this.screen = screenTextElement;
        this.CE();
    }
    get_number()
    {
        return parseFloat(this.number_left.concat(".").concat(this.number_right).concat("0"));
    }
    CE()
    {
        //console.log("CE");
        this.number_left="0";
        this.number_right="";
        this.insert_left=true;
        this.update_screen();
    }
    C()
    {
        //console.log("C");
        console.log(this.get_number())
        this.number_left="0";
        this.number_right="";
        this.insert_left=true;
        this.update_screen();
    }
    dot()
    {
        this.insert_left=false;
        console.log(this.insert_left);
    }
    add_number(number)
    {
        //console.log("addnumber called")
        if(this.insert_left)
        {
            if(this.number_left==="0")this.number_left="";
            this.number_left = this.number_left.concat(number);
        }
        else
        {
            this.number_right = this.number_right.concat(number);
        }
        this.update_screen();
    }
    operate(operator)
    {
        if(operator==="±")
        {
            if(this.number_left[0]==='-')this.number_left=this.number_left.substring(1);
            else this.number_left="-".concat(this.number_left);
        }
        this.update_screen();
    }
    update_screen()
    {
        //console.log("update called");
        this.screen.innerText = this.number_left.concat(".").concat(this.number_right);
    }
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

const calculator = new Calculator(screenTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click',()=>
    {
        calculator.add_number(button.innerText);
    }
    )
});
operatorButtons.forEach(button => {
    button.addEventListener('click',()=>
    {
        calculator.operate(button.innerText);
    }
    )
});
/*
Button.addEventListener('click',()=>
{

});*/
CButton.addEventListener('click',()=>
{
    calculator.C();
})
CEButton.addEventListener('click',()=>
{
    calculator.CE();
})
dotButton.addEventListener('click',()=>
{
    calculator.dot();
})
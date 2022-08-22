/*
Todo
brackets
* /
memory
C vs CE
*/


/*
closing bracket summons number
pressing operator has no effect
7 decimal precisiom? no, answer follows rules
if number too large, ERROR
M+ makes M appear on left
further pressing mplus has no effect
mc makes M disappear
when ansers are on screen, third state - further input wipes screen

    0.
5   5.
+   5.
6   6.
*   6.
2   2.
=   17


    0.
5   5.
+   5.
6   6.
+   11.         here is the key
2   2.
=   13.


+ and - are in a tier below * and % which are below sqrt()


*/


class Calculator
{
    constructor(screenTextElement)
    {
        this.screen = screenTextElement;
        this.C();
    }
    get_number()
    {
        return parseFloat(this.number_left.concat(".").concat(this.number_right).concat("0"));
    }
    CE()
    {
        //console.log("CE");
        if(this.is_error)return;
        this.number_left="0";
        this.number_right="";
        this.insert_left=true;
        this.is_error = false;
        this.change_number = false;
        this.operator = "";
        this.previous_number = "";
        this.update_screen();
    }
    C()
    {
        //console.log("C");
        this.number_left="0";
        this.number_right="";
        this.insert_left=true;
        this.is_error=false;
        this.change_number = false;
        this.operator = "";
        this.previous_number = "";
        this.operate_block = true;
        this.update_screen();
    }
    dot()
    {
        if(this.is_error)return;
        this.insert_left=false;
    }
    equals()
    {
        
        if(this.is_error)return;
        this.calculate();
        this.operator="";
        this.previous_number="";
        this.change_number=true;
        this.update_screen();
        
    }
    calculate()
    {
        if(this.previous_number==="")return;
        if(this.operator==="+")
        {
            this.set_number(this.previous_number+this.get_number())
            this.change_number=true;
        }
        if(this.operator==="-")
        {
            this.set_number(this.previous_number-this.get_number())
            this.change_number=true;
        }
        this.previous_number="";
    }
    add_number(number)
    {
        console.log("add_number called");
        if(this.is_error)return;
        this.operate_block=false;
        if(this.change_number===true)
        {
            this.previous_number = this.get_number();
            this.number_left="0";
            this.number_right="";
            this.change_number=false;
        }
        if(this.number_left.length+this.number_right.length>=8)return;
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
        if(this.is_error )return;
        if(operator==="±")
        {
            if(this.get_number()===0.0)return;
            if(this.number_left[0]==='-')this.number_left=this.number_left.substring(1);
            else this.number_left="-".concat(this.number_left);
        }
        else if(operator==="√")
        {
            if(this.get_number()<0)
            {
                this.set_ERROR();
            }
            this.set_number(Math.sqrt(this.get_number()));
        }
        else if(operator==='+' || operator==='-')
        {
            this.calculate();
            this.operator=operator;
            if(this.operate_block)return;
            this.operate_block = true;
            this.change_number = true;
        }
        this.update_screen();
    }
    set_number(new_number)
    {
        console.log("set_number called")
        var number_string = "".concat(new_number);
        var dot_index = number_string.indexOf(".");
        if(dot_index===-1)
        {
            number_string=number_string.concat(".");
            dot_index = number_string.length-1;
        }
        var left = number_string.substring(0,dot_index);
        var right = number_string.substring(dot_index+1);
        if(left.length > 8)
        {
            this.set_ERROR();
        }
        else if(left.length === 8)
        {
            this.number_right="";
            this.number_left=left;
        }
        else
        {
            this.number_left = left;
            this.number_right = right.substring(0,8-left.length);
        }
    }
    set_ERROR()
    {
        this.number_left="0";
        this.number_right="";
        this.is_error = true;
    }
    update_screen()
    {
        if(this.is_error===true)
        {
            this.screen.innerText = "ERROR";
            return;
        }
        var nl = "";
        var num_left = this.number_left.charAt(0)==='-'?this.number_left.substring(1):this.number_left.substring(0);
        for(var i=0;i<num_left.length;i++)
        {
            if(i!=0 && i%3===0)nl=",".concat(nl);
            nl = "".concat(num_left[num_left.length-i-1]).concat(nl);
            
        }
        if(this.number_left.charAt(0)==='-')nl = "-".concat(nl);
        this.screen.innerText = nl.concat(".").concat(this.number_right);
        this.log_state();
    }
    log_state()
    {
        console.log("number_left:".concat(this.number_left));
        console.log("number_right:".concat(this.number_right));
        console.log("operator:".concat(this.operator));
        console.log("previous_number:".concat(this.previous_number));
        console.log("change_number:".concat(this.change_number));
        console.log("operate_block:".concat(this.operate_block));
        console.log("is_error:".concat(this.is_error));
        console.log("-----------------------------------------------")
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
equalButton.addEventListener('click',()=>
{
    calculator.equals();
});
closeBracketButton.addEventListener('click',()=>
{
    if(calculator.is_error)return;
    openBracketButton.disabled = false;
    closeBracketButton.disabled = true;
    console.log("close");
});
openBracketButton.addEventListener('click',()=>
{
    if(calculator.is_error)return;
    openBracketButton.disabled = true;
    closeBracketButton.disabled = false;
    console.log("open");
});
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

closeBracketButton.disabled = true;
const display =document.querySelector("#currdisplay");
const prevdisplay =document.querySelector("#prevdisplay");
const buttons =document.querySelectorAll("button");
const historyctnr = document.querySelector("#history");
const specialChar = ["*", "/", "-", "+", "exp"];
const digitsChar = [".","00","0","1", "2", "3", "4","5","6","7","8","9"];
let output= "";
let current = "";
let eq = "";
let ans = "";
let equation = "";
let history = [];

function append(value) {
    if(current.includes("√") && specialChar.includes(value)){
  
        eq += current + value;
        let data = parseFloat(current.slice(1));
        const result = Math.sqrt(data);
        equation += result.toString() + value;
        current = "";
        prevdisplay.value = equation;
    }
    else if (specialChar.includes(value) && current.length > 0){
        if(value == "exp"){
         
            let squared = Math.pow(parseFloat(current), 2);
            current =  squared.toString();
        }
        else{
            equation += current + value;
            eq += current + value;
            current = "" ;
        }
        prevdisplay.value = equation;
        display.value = current ;
    }
    else {
        current += value;
        display.value = current;
    }
  }
 
function compute(){
  if(!specialChar.includes(equation.charAt(equation.length-1)) || 
     equation.charAt(equation.length-1) !== "√"){
      calculate();
  }
}
function calculate() {
  try {
      let result = "";
      equation += current;
        
      if(equation.charAt(0) === "√"){
        let data = parseFloat(current.slice(1));
          result = Math.sqrt(data);
          eq += current + "=" + result.toString();
        }
   
        else if(equation.includes("√")){
          let parts = equation.split("√");
          let data = Math.sqrt(parseFloat(parts[1]));
          result = eval(parts[0]+data);
          eq += current + "=" + result;
        }
        else {
          
          result = eval(equation);
          console.log(result);
          eq += current + "=" + result.toString();
        }
      prevdisplay.value = "";
      display.value = result;
      createHistory(eq);
      current = '';
      equation = '';
      eq = '';
    } catch (error) {
    display.value = 'Error';
    }
}
  
function clearEntry() {
    current = '';
    equation = '';
    eq= "";
    display.value = '';
    prevdisplay.value = "";
}

function del(){
    var currentValue = display.value;
    display.value= currentValue.slice(0, -1);
    autodisplay.value = "";
    autocompute = false;
}
  
function clearAll() {
    location.reload();
}
  
function toggleSign() {
    let num = parseFloat(current);
    num = num * -1;
    current = num.toString();
    display.value = current;
}
  
function squareRoot() {
    if(current.length === 0){
        current += "√";
        display.value = current;
    }
}

function percentage(){
    if(current.length > 0){
        let data = parseFloat(current)*0.01;
        current = data.toString();
        display.value = current;
    }
}

function createHistory(txt){
    const data = document.createElement("p");
    data.classList.add("data_history");
    data.textContent = txt;
    historyctnr.appendChild(data);
}



 
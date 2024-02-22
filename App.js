const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


for(let select of dropdown){
    for( currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value=currCode;
        if(select.name=="from" && currCode=="USD"){
            newOption.selected = true;
        }else if(select.name=="to" && currCode=="INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
     updateFlag(evt.target);
    });
}
const updateExchangeRate = async () => {
    let amount=document.querySelector(".amount input");
    let amtVal = amount.value;
    
    if(amtVal==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
let URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);

let data = await response.json();
let rate = data[toCurr.value.toLowerCase()];

let finalAmount = rate * amtVal;

msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}
const updateFlag = (element) => {
let countryCode =  countryList[element.value];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img"); 
img.src=newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});


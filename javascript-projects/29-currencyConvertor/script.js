const dropList = document.querySelectorAll(".drop-list select");

const fromInput = document.getElementById("from-amount"),
      toInput = document.getElementById("to-amount");

const fromCurrency = document.querySelector (".from select"),
      toCurrency = document.querySelector (".to select");

const ahtrht354645656755886763tg = "046167fa3f490a83d219b9f0";

let fromLabel = document.getElementById("from-label"),
      toLabel = document.getElementById("to-label");

const swapCurrency = document.querySelector(".swap-icon");


function updateLabel(){
  fromLabel.textContent = `Enter Amount in ${fromCurrency.value}`;
  toLabel.textContent = `Enter Amount in ${toCurrency.value}`;
}

fromCurrency.addEventListener("change", updateLabel);
toCurrency.addEventListener("change", updateLabel);


for (let i = 0; i<dropList.length; i++){
  for(currency_code in country_list){

    let selected;
    if (i==0){
      selected = currency_code =="USD"? "selected" : "";
    } else if (i==1){
      selected = currency_code == "INR" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
    dropList[i].insertAdjacentHTML("beforeend", optionTag)
  }
}


async function getExchangeRate(amount, calledBy){
  if (!/^\d*\.?\d*$/.test(amount) || amount === "" || amount == 0) {
    
    amount = 0;
  }
  try {
    let url;
    if (calledBy == "callFrom"){
      url = `https://v6.exchangerate-api.com/v6/${ahtrht354645656755886763tg}/latest/${fromCurrency.value}`;
    } else {
      url = `https://v6.exchangerate-api.com/v6/${ahtrht354645656755886763tg}/latest/${toCurrency.value}`;
    }

    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();

    if (!data.conversion_rates) {
      throw new Error("Invalid response data");
    }

    let exchangeRate = calledBy == "callFrom" ? data.conversion_rates[toCurrency.value] : data.conversion_rates[fromCurrency.value];
    
    if (!exchangeRate) {
      throw new Error("Exchange rate not found");
    }

    let totalExchangeRate = amount * exchangeRate;
    return totalExchangeRate;

  } catch (error) {
    console.error("Error fetching exchange rate: ", error);
    return "Error fetching exchange rate"; // or handle the error as needed
  }
}



function fixLabel(calledBy){
  if (calledBy == "callFrom"){
    if(fromInput.value) {
      toLabel.classList.add('label-focused');
    } 
  } else {
    if(toInput.value) {
      fromLabel.classList.add('label-focused');
    } 
  }
}


async function displayRate(amount, calledBy){
  fixLabel(calledBy);
  let totalExchangeRate = await getExchangeRate(amount, calledBy);
  
  if (calledBy == "callFrom" && !isNaN(totalExchangeRate)){
    toInput.value = `${totalExchangeRate.toFixed(2)}`;
  } else if (calledBy == "callTo" && !isNaN(totalExchangeRate)){
    fromInput.value = `${totalExchangeRate.toFixed(2)}`;
  }
}


let timeoutId = null;
function callApi(amount, calledBy){
  if (timeoutId){
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(()=>{
    
    displayRate(amount,calledBy);
  },200);
}

let callFrom = "callFrom"
let callTo = "callTo";
fromInput.addEventListener("input", ()=>{
  const fromAmount = fromInput.value;
  
  callApi(fromAmount, callFrom);
})

toInput.addEventListener("input", ()=>{
  const toAmount = toInput.value;
  
  callApi(toAmount, callTo);
})


swapCurrency.addEventListener("click",()=>{
  let a = toCurrency.value;
  toCurrency.value = fromCurrency.value;
  fromCurrency.value = a;
  
  let b = toInput.value;
  fixLabel(callFrom);
  fixLabel(callTo);
  toInput.value = fromInput.value;
  fromInput.value = b;

  updateLabel();
});

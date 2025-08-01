const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg_div");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "JPY") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evnt) => {
    updateFlag(evnt.target);
  });
}

const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  udpadeExchangeRate();
});
const udpadeExchangeRate = async()=>{
  let ammount = document.querySelector(".ammount input");
  let amtVal = ammount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    ammount.value = "1";
  }
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${from}&to=${to}`;
  //const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  if (!response.ok) {
  console.error("API error", response.status);
  msg.innerText = "Error fetching data";
  return;
}
  let data = await response.json();
  let rate = data.rates[to];

  msg.innerText = `${amtVal} ${from} = ${rate} ${to}`;
}
window.addEventListener("load", ()=>{
  udpadeExchangeRate();
})

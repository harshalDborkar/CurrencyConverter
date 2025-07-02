const dropDowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const total = document.querySelector(".total p")

for (let select of dropDowns){

    for (code in countryList){
        let newOption = document.createElement("option")
        newOption.value = code;
        newOption.innerText = code;
        select.append(newOption);
        if(select.name ==="from" & code === "USD"){
            newOption.selected = "selected";
        }
        if(select.name ==="to" & code === "INR"){
            newOption.selected = "selected";
        }
        
    };
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })

}

const from = document.querySelector(".from select");
const to = document.querySelector(".to select");

const updateFlag =(evt)=>{
    let link = `https://flagsapi.com/${countryList[evt.value]}/flat/64.png`;
    let img = evt.parentElement.querySelector("img");
    img.src = link;
};

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount  input");
    if( amount === "" || amount <= 0){
        amount = 1;
        amount.value = 1;
    }
    let baseUrl = `https://api.frankfurter.dev/v1/latest?base=${from.value}`;

    const resopnse = await fetch(baseUrl);
    const rate = await resopnse.json();
    if(to.value === from.value ){
        msg.innerText = `1 ${from.value} = 1 ${to.value}`;
        total.innerText = amount.value;
    }
    else{
        msg.innerText = `1 ${from.value} = ${rate.rates[to.value]} ${to.value}`;
        total.innerText = rate.rates[to.value] * (amount.value);
    }
})
const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {});
// Values from the from
const initialAmount = document.getElementById("initialamount");
const years = document.getElementById("years");
const rates = document.getElementById("rates");
const compound = document.getElementById("compound");

// The calculate button
const button = document.querySelector(".input-group button");
//Attach an event listener
button.addEventListener("click", calculateGrowth);

const data = [];
const labels = [];

function calculateGrowth (e){
    e.preventDefault();
    // data.length = 0;
    // labels.length = 0;

    try{
        const initial = parseInt(initialAmount.value)
        const period = parseInt(years.value)
        const interest = parseInt(rates.value)
        const comp = parseInt(compound.value)

        for(let i=1; i<=period; i++){
            const final = initial*Math.pow(1 + ((interest/100) /comp), comp * i)
            data.push(final);
            labels.push("Years" + i)

        }
        drawGraph();
    }catch (error){
        console.error(error);

    }
}

function drawGraph(){
   line.destroy();
   line = new Chart(context,{
        type: 'line',
        data: {
            labels,
            datasets:[{
                label: "compound",
                data: data,
                fill: true,
                backgroundColor: "rgba(0,0,128,0.6)",
                borderWidth: 3
            }]
        }
        
    });
}

function toDecimal (value, decimals){
    return +value.toFixed(decimals);
}
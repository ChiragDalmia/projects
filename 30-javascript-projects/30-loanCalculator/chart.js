let myChart;
const displayChart = (totalInterestPayableValue, loanAmountValue)=> {
  const chart = document.getElementById("myChart");
  chart.width= 300;
  chart.height = 300;

  const ctx = chart.getContext("2d");

  
  myChart = new Chart(ctx, {
     type: "pie",
     data: {
       labels: ["Total Interest", "Principal Loan Amount"],
       datasets: [
         {
           data: [totalInterestPayableValue, loanAmountValue],
           backgroundColor: ["#6BEC68", "#EB5545"],
           borderWidth: 0,
         },
       ],
     },
   });
}

const updateChart = (totalInterestPayableValue, loanAmountValue)=>{
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmountValue;
  myChart.update();
}
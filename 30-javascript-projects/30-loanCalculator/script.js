const loanAmountInput = document.querySelector('.loan-amount'),   
      interestRateInput = document.querySelector('.interest-rate'),
      loanTenureInput = document.querySelector('.loan-tenure');

const loanEMIValue = document.querySelector('.emi-value'),
      totalInterestValue = document.querySelector('.interest-value'),
      totalAmountValue = document.querySelector('.total-value');

const calculateButton = document.querySelector('.calculate-btn');

const answers = document.querySelector('.answers');

let loanAmount = parseFloat(loanAmountInput.value),
    interestRate = parseFloat(interestRateInput.value),
    loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 100 / 12;

const validateMsg = document.querySelector('.validate-input-msg');
const validateInput = () => {
  let loanAmountValue = parseFloat(loanAmountInput.value);
  let interestRateValue = parseFloat(interestRateInput.value);
  let loanTenureValue = parseFloat(loanTenureInput.value);

  // Define reasonable limits for each input
  const minLoanAmount = 1; 
  const maxLoanAmount = 1e12; // 1 trillion
  const minInterestRate = 0.001; // 0.1% per annum
  const maxInterestRate = 100; // 100% per annum
  const minLoanTenure = 1; 
  const maxLoanTenure = 1200; // 100 years

  const displayErrorMsg = (msg) => {
    validateMsg.textContent = msg;
    validateMsg.style.display = 'block'; // Set display to block
  };

  if (isNaN(loanAmountValue)) {
    displayErrorMsg("Invalid loan amount. Please enter a numeric value.");
    return false;
  } else if (loanAmountValue < minLoanAmount || loanAmountValue > maxLoanAmount) {
    displayErrorMsg(`Loan amount should be between ${minLoanAmount} and ${maxLoanAmount}.`);
    return false;
  }

  if (isNaN(interestRateValue)) {
    displayErrorMsg("Invalid interest rate. Please enter a numeric value.");
    return false;
  } else if (interestRateValue < minInterestRate || interestRateValue > maxInterestRate) {
    displayErrorMsg(`Interest rate should be between ${minInterestRate}% and ${maxInterestRate}%.`);
    return false;
  }

  if (isNaN(loanTenureValue)) {
    displayErrorMsg("Invalid loan tenure. Please enter a numeric value.");
    return false;
  } else if (loanTenureValue < minLoanTenure || loanTenureValue > maxLoanTenure) {
    displayErrorMsg(`Loan tenure should be between ${minLoanTenure} months and ${maxLoanTenure} months.`);
    return false;
  }

  validateMsg.textContent = '';
  validateMsg.style.display = 'none'; // Hide the message if validation is successful
  return true;
};

const calculateEMI = () => {
  let P = loanAmount;
  let r = interest;
  let n = loanTenure;
  let emi = P * r * (Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);

  return emi;
};

const updateData = (emi) => {
  let totalEmi = emi.toFixed(2);
  let totalAmount = emi * loanTenure;
  let totalInterest = (emi * loanTenure) - loanAmount;

  loanEMIValue.textContent = totalEmi;
  totalInterestValue.textContent = totalInterest.toFixed(2);
  totalAmountValue.textContent = totalAmount.toFixed(2);

  // calling functions from chart.js 
  if (myChart){
    updateChart(totalInterest.toFixed(2),loanAmount.toFixed(2));
  } else{
    displayChart(totalInterest.toFixed(2),loanAmount.toFixed(2));
  }


  
  // 'Fade' animation keyframe is there in css, triggering it here
  loanEMIValue.classList.add('fade');
};


const refreshInputs = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 100 / 12;
};

const init = () => {
  if (!validateInput()) {
    
    return;
  }
  answers.style.display = 'block';
  refreshInputs();
  let emi = calculateEMI();
  updateData(emi);
};



calculateButton.addEventListener('click', init);


// 'Enter' key press triggers calculation
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    init();
  }
});
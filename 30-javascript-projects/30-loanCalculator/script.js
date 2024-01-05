// Selecting DOM elements for the loan calculator inputs and outputs
const loanAmountInput = document.querySelector('.loan-amount'),   
      interestRateInput = document.querySelector('.interest-rate'),
      loanTenureInput = document.querySelector('.loan-tenure');

const loanEMIValue = document.querySelector('.emi-value'),
      totalInterestValue = document.querySelector('.interest-value'),
      totalAmountValue = document.querySelector('.total-value');

const calculateButton = document.querySelector('.calculate-btn');

const answers = document.querySelector('.answers');

// Initializing variables to store loan details
let loanAmount = parseFloat(loanAmountInput.value),
    interestRate = parseFloat(interestRateInput.value),
    loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 100 / 12; // Converting annual interest rate to monthly

// Element to display validation messages
const validateMsg = document.querySelector('.validate-input-msg');

// Function to validate user input
const validateInput = () => {
  let loanAmountValue = parseFloat(loanAmountInput.value);
  let interestRateValue = parseFloat(interestRateInput.value);
  let loanTenureValue = parseFloat(loanTenureInput.value);

  // Defining limits for input validation
  const minLoanAmount = 1;
  const maxLoanAmount = 1e12;
  const minInterestRate = 0.001;
  const maxInterestRate = 100;
  const minLoanTenure = 1;
  const maxLoanTenure = 1200;

  // Function to display error message
  const displayErrorMsg = (msg) => {
    validateMsg.textContent = msg;
    validateMsg.style.display = 'block';
  };

  // Validating loan amount, interest rate, and tenure
  if (isNaN(loanAmountValue)) {
    displayErrorMsg("Invalid loan amount. Please enter a numeric value.");
    return false;
  }

  // [Similar validation checks for interest rate and loan tenure]

  // Clearing the error message if validation is successful
  validateMsg.textContent = '';
  validateMsg.style.display = 'none';
  return true;
};

// Function to calculate EMI
const calculateEMI = () => {
  let P = loanAmount;
  let r = interest;
  let n = loanTenure;
  let emi = P * r * (Math.pow((1 + r), n)) / (Math.pow((1 + r), n) - 1);

  return emi;
};

// Function to update the calculated data in the DOM
const updateData = (emi) => {
  let totalEmi = emi.toFixed(2);
  let totalAmount = emi * loanTenure;
  let totalInterest = (emi * loanTenure) - loanAmount;

  loanEMIValue.textContent = totalEmi;
  totalInterestValue.textContent = totalInterest.toFixed(2);
  totalAmountValue.textContent = totalAmount.toFixed(2);

  // Update or display chart using Chart.js (if integrated)
  if (myChart){
    updateChart(totalInterest.toFixed(2),loanAmount.toFixed(2));
  } else{
    displayChart(totalInterest.toFixed(2),loanAmount.toFixed(2));
  }

  // Triggering animation for displaying results
  loanEMIValue.classList.add('fade');
};

// Function to refresh input values
const refreshInputs = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 100 / 12;
};

// Main function to initialize the calculation
const init = () => {
  if (!validateInput()) {
    return;
  }
  answers.style.display = 'block';
  refreshInputs();
  let emi = calculateEMI();
  updateData(emi);
};

// Event listener for the calculate button
calculateButton.addEventListener('click', init);

// Adding 'Enter' key press event to trigger calculation
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    init();
  }
});

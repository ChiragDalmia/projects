let pass = document.getElementById("password");
let msg = document.getElementById("message");
let str = document.getElementById("strength");

// Function to evaluate password strength
function evaluatePasswordStrength(password) {
  let factors = 0;
  if (password.match(/[a-z]/)) {
    factors++;
  }
  if (password.match(/[A-Z]/)) {
    factors++;
  }
  if (password.match(/[0-9]/)) {
    factors++;
  }
  if (password.match(/[\W_]/)) {
    factors++;
  }

  switch(factors) {
    case 1:
      return 0; // Weak
    case 2:
      return 1; // Fair
    case 3:
      return 2; // Good
    case 4:
      return 3; // Strong
    default:
      return 0; // No factors, weakest
  }
}


// Function to update UI based on password strength
function updateUI(strength) {
  const colors = ["red", "orange", "yellow", "lightgreen"];
  const messages = ["Weak", "Fair", "Good", "Strong"];

  if (pass.value.length === 0) {
    pass.style.borderColor = "initial"; // Reset to default or initial style when empty
    msg.style.display = "none";         // Hide message when there's no input
    return;                              // Exit the function early
  }

  pass.style.borderColor = colors[strength];
  msg.style.color = colors[strength];
  str.innerHTML = messages[strength];
}

pass.addEventListener("input", () => {
  const password = pass.value;
  if (password.length > 0) {
    msg.style.display = "block";
    const strength = evaluatePasswordStrength(password);
    updateUI(strength);
  } else {
    updateUI(0); // Reset UI when password is cleared
  }
});

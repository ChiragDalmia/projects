const inputBox = document.querySelector(".input-box");

// Hover
inputBox.addEventListener("mouseover", function () {
  document.body.classList.add("background-change");
  document.body.classList.remove("background-change-reverse");
});

inputBox.addEventListener("mouseout", function () {
  document.body.classList.remove("background-change");
  document.body.classList.add("background-change-reverse");
});
// Active
inputBox.addEventListener("mousedown", function (e) {
  document.body.classList.add("background-change-reverse");
  document.body.classList.remove("background-change");
  e.stopPropagation(); // Prevents the event from bubbling up to the document body
});

// Clicking on the body outside the inputBox
document.body.addEventListener("mousedown", function () {
  document.body.classList.remove("background-change-reverse");
  document.body.classList.add("background-change");
});

// Clicking on the inputBox

let eye = document.querySelector('.fa-eye');
    let eyeicon = document.querySelector('#eyeicon');
    let password = document.querySelector('#password');

    setInterval(() => {
      eye.classList.toggle('fa-bounce');
    }, 3000);

    eyeicon.addEventListener('click', () => {
      if (password.type === 'password') {
        password.type = 'text';
        eyeicon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        password.type = 'password';
        eyeicon.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });

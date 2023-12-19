const plane = document.querySelector(".fa-paper-plane");

setTimeout(() => {
  plane.classList.remove("fa-bounce");
}, 3000);

// name validation
const inputName = document.querySelector('input[type="text"]');
const nameError = document.querySelector('#name-error');
let nameMax = 20;
let nameMin = 3;

inputName.addEventListener('input', () => {
  if (inputName.value.length == 0) {
    nameError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Name is required`;
  } else if (!inputName.value.match(/^[A-Za-z\s]*$/)) {
    nameError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Invalid character`;
    // stop user from entering invalid character
    inputName.value = inputName.value.substring(0, inputName.value.length - 1);
    
  } else if (!inputName.value.match(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)) {
    nameError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Full name required`;
  } else if (inputName.value.length < nameMin) {
    nameError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Too short`;
  } else if (inputName.value.length > nameMax) {
    nameError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Too long`;
  } else {
    nameError.innerHTML = `<i class="fas fa-check-circle" style="color:green;"></i>`;
  }
});

// phone validation
const phone = document.querySelector('input[type="tel"]');
const phoneError = document.querySelector('#phone-error');

phone.addEventListener('input', () => {
  nameError.innerHTML = ``; // clear name error message
  if (phone.value.length == 0) {
    phoneError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Phone is required`;
  } else if (!phone.value.match(/^[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/)) {
    phoneError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Invalid phone number`;
  } else {
    phoneError.innerHTML = `<i class="fas fa-check-circle" style="color:green;"></i>`;
  }

  // if input is not a number, remove it
  if (isNaN(phone.value)) {
    phone.value = phone.value.substring(0, phone.value.length - 1);
  }
});

 // email validation
 const email = document.querySelector('input[type="email"]');
 const emailError = document.querySelector('#email-error');

 email.addEventListener('input', () => {
    phoneError.innerHTML = ``; // clear phone error message
   const trimmedEmail = email.value.trim();

   if (trimmedEmail.length == 0) {
     emailError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Email is required`;
   } else if (!trimmedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)) {
     emailError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Invalid email`;
   } else {
     emailError.innerHTML = `<i class="fas fa-check-circle" style="color:green;"></i>`;
   }
 });

 // message validation
 const message = document.querySelector('textarea');
 const messageError = document.querySelector('#message-error');

 message.addEventListener('input', () => {
    emailError.innerHTML = ``; // clear email error message
   const trimmedMessage = message.value.trim();

   if (trimmedMessage.length == 0) {
     messageError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Message is required`;
   } else {
     messageError.innerHTML = `<i class="fas fa-check-circle" style="color:green;"></i>`;
   }
 });

 // submit validation
 const submit = document.querySelector('button');
 const submitError = document.querySelector('#submit-error');
 const success = document.querySelector('#success');

 submit.addEventListener('click', (e) => {
    messageError.innerHTML = ``; // clear message error message
   if (nameError.innerHTML.length > 0 ) {
     e.preventDefault();
     nameError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Name is required`;
    } else if (phoneError.innerHTML.length > 0 ) {
      e.preventDefault();
      phoneError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Phone is required`;
    } else if (emailError.innerHTML.length > 0 ) {
      e.preventDefault();
      emailError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Email is required`;
    } else if (messageError.innerHTML.length > 0 ) {
      e.preventDefault();
      messageError.innerHTML = `<i class="fas fa-exclamation-circle"></i> Message is required`;
    } else {
      e.preventDefault();
      success.innerHTML = `<i class="fas fa-check-circle"></i> Message sent!`;
    }
 });
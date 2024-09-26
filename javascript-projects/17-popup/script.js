const submitBtn = document.getElementById('submitBtn');
const popup = document.getElementById('popup');
const okBtn = document.querySelector('.ok-btn');
const okText = document.querySelector('#okText');

function openPopup() {
  popup.classList.add('active');
  submitBtn.classList.add('active');
  // Add bounce effect to okText
  okText.classList.add('fa-bounce');
  setTimeout(() => {
    okText.classList.remove('fa-bounce');
  }, 1000);
}

function closePopup() {
  popup.classList.remove('active');
  submitBtn.classList.remove('active');
}

submitBtn.addEventListener('click', openPopup);
okBtn.addEventListener('click', closePopup);

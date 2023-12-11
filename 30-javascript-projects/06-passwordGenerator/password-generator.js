const bolt = document.querySelector('.fa-bolt');

setTimeout(() => {
    bolt.classList.remove('fa-bounce');
}, 3000);


const passwordBox =  document.getElementById('password');
const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');
const length = 12;
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

const allCharacters = upperCase + lowerCase + numbers + symbols;
function getRandom(str) {
  let index = Math.floor(Math.random() * str.length);
  return str[index];
}
function createPassword() {
    let password='';
    password += getRandom(upperCase);
    password += getRandom(lowerCase);
    password += getRandom(numbers);
    password += getRandom(symbols);
    while (length>password.length) {
        password += getRandom(allCharacters);
    }
    passwordBox.value = password;
}

function copyPassword() {
    passwordBox.select();
    document.execCommand('copy');
}

generateButton.addEventListener('click', createPassword);
copyButton.addEventListener('click', copyPassword);
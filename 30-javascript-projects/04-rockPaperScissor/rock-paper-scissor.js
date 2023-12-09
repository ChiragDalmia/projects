// DOM Element Selection
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissors-button');
const resetButton = document.querySelector('.js-reset-button');
const autoPlayButton = document.querySelector('.js-auto-play');
const confirmation = document.querySelector('.js-confirmation');
const resultDisplay = document.querySelector('.js-result');
const movesDisplay = document.querySelector('.js-moves');
const scoreDisplay = document.querySelector('.js-score');
    
// Score and state management
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };
let isAutoPlaying = false;
let intervalId;
const choices = ['Rock', 'Paper', 'Scissors'];
    
// Function to update the displayed score
function updateScore() {
  scoreDisplay.innerHTML = `Score: ${score.wins} wins, ${score.losses} losses, ${score.ties} ties`;
}

// Function to display a notification about score saving
function displayLocalStorageNotification() {
  if (!localStorage.getItem('score')) {
const notification = document.createElement('div');
notification.innerHTML = 'Lets Play! :)';
// Find the card element
const cardElement = scoreDisplay;
// Append the notification to the card element
cardElement.appendChild(notification);
// Remove the notification after 3 seconds
setTimeout(() => notification.remove(), 1500);
  } else {
    const notification = document.createElement('div');
notification.innerHTML = 'Your score is being saved locally.';
// Find the card element
const cardElement = scoreDisplay;
// Append the notification to the card element
cardElement.appendChild(notification);
// Remove the notification after 3 seconds
setTimeout(() => notification.remove(), 1500);
  }
}


// The main game logic
function game(userChoice) {
  const computerChoice = Math.floor(Math.random() * 3);
  const resultMapping = { 0: 'tied', 1: 'win', 2: 'lose' };
  const resultIndex = (3 + userChoice - computerChoice) % 3;
  const result = resultMapping[resultIndex];
    
  score[result === 'win' ? 'wins' : result === 'lose' ? 'losses' : 'ties']++;
  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
    
  resultDisplay.innerHTML = `You ${result}!`;
  movesDisplay.innerHTML = `You <img src="images/${choices[userChoice]}-emoji.png" class="move-icon"> vs <img src="images/${choices[computerChoice]}-emoji.png" class="move-icon"> Computer`;
}

// Function for auto-playing the game
function autoPlayToggle() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      game(Math.floor(Math.random() * 3));
    }, 1000);
    autoPlayButton.textContent = 'Stop Auto Play';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlayButton.textContent = 'Start Auto Play';
    isAutoPlaying = false;
  }
}

// Function to reset the game
function resetGame() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScore();
  resultDisplay.innerHTML = '';
  movesDisplay.innerHTML = '';
}

// Function to confirm the reset action
function getConfirmation() {
  const confirmationMessage = 'Are you sure you want to reset? <br> <button class="js-reset-yes reset-yes">Yes</button> <button class="js-reset-no reset-no">No</button>';
  const notPlayedMessage = 'You have not played any games yet :|';
    
  if (score.wins > 0 || score.losses > 0 || score.ties > 0) {
    confirmation.innerHTML = confirmationMessage;
    document.querySelector('.js-reset-yes').addEventListener('click', () => {
      resetGame();
      confirmation.innerHTML = '';
    });
    document.querySelector('.js-reset-no').addEventListener('click', () => {
      confirmation.innerHTML = '';
    });
  } else {
    confirmation.innerHTML = notPlayedMessage;
    setTimeout(() => {
      confirmation.innerHTML = '';
    }, 2000);
  }
}

// Event listeners for game choices
rockButton.addEventListener('click', () => game(0));
paperButton.addEventListener('click', () => game(1));
scissorsButton.addEventListener('click', () => game(2));

// Event listener for auto-play button
autoPlayButton.addEventListener('click', autoPlayToggle);

// Event listener for reset button
resetButton.addEventListener('click', getConfirmation);

// Keyboard event listeners for playing the game and auto-play
document.body.addEventListener('keyup', (event) => {
  const keyActions = {
    'r': () => game(0),
    'p': () => game(1),
    's': () => game(2),
    'a': autoPlayToggle,
    'Backspace': getConfirmation
  };
  const action = keyActions[event.key.toLowerCase()];
  if (action) action();
});

// Initialize the score display on page load
updateScore();

// Call the function to display local storage notification on page load
displayLocalStorageNotification();
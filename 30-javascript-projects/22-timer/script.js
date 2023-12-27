const hoursInput = document.querySelector('.js-hours-input'),
      minutesInput = document.querySelector('.js-minutes-input'),
      secondsInput = document.querySelector('.js-seconds-input');

const startStopButton = document.querySelector('.js-start-stop-button'),
      cancelButton = document.querySelector('.js-cancel-button');

const circle = document.querySelector('[data-circle]');

const alarmSound = new Audio('alarm.mp3');

let startIntervalId = null;
let remainingMilliseconds = null;

// Function to slice the input value to 2 digits for all the inputs
function sliceInput(input) {
  if (input) {
    input.addEventListener('input', () => {
      // Remove non-numeric characters
      input.value = input.value.replace(/\D/g, '');

      // Convert the string to a number to check if it's greater than 59
      let numericValue = parseInt(input.value, 10);

      if (input.value.length > 2 || numericValue > 59) {
        input.value = input.value.slice(0, 2);
      }
    });
  }
}

sliceInput(hoursInput);
sliceInput(minutesInput);
sliceInput(secondsInput);

// Function to convert hours, minutes, and seconds to milliseconds
function convertToMilliseconds(hours, minutes, seconds) {
  let totalMilliseconds = 0;
  if (hours) totalMilliseconds += hours * 60 * 60 * 1000;
  if (minutes) totalMilliseconds += minutes * 60 * 1000;
  if (seconds) totalMilliseconds += seconds * 1000;
  return totalMilliseconds;
}

// Function to update the circle's progress
function updateCircle(currentMilliseconds, totalMilliseconds) {
  const startLength = 0; // Starting length of the circle's stroke
  const endLength = 986.96; // Ending length of the circle's stroke
  const progress = currentMilliseconds / totalMilliseconds;
  const newOffset = ((1 - progress) * endLength) + startLength;

  circle.style.strokeDashoffset = newOffset;
}

let currentMilliseconds = 0; 

function playAlarmSound() {
  alarmSound.currentTime = 0; // Start from the beginning
  alarmSound.play();
}
// Function to start the timer
function startTimer(milliseconds) {
  currentMilliseconds = milliseconds;
  const totalMilliseconds = milliseconds;
  updateCircle(currentMilliseconds, totalMilliseconds);
  startIntervalId = setInterval(() => {
    if (currentMilliseconds === 0) {
      clearInterval(startIntervalId);
      startIntervalId = null;
      startStopButton.textContent = 'Start';
      startStopButton.classList.remove('stop-button');
      startStopButton.classList.add('start-button');
      cancelButton.disabled = true;

      // Play the alarm sound, and stop when the user clicks on the ok alert button
      playAlarmSound();
      alert('Time is up!');
      alarmSound.pause();
      alarmSound.currentTime = 0;
    } else {
      currentMilliseconds -= 10;
      updateCircle(currentMilliseconds, totalMilliseconds);
      const hours = Math.floor(currentMilliseconds / 3600000);
      const minutes = Math.floor((currentMilliseconds % 3600000) / 60000);
      const seconds = Math.floor((currentMilliseconds % 60000) / 1000);
      hoursInput.value = hours < 10 ? `0${hours}` : hours;
      minutesInput.value = minutes < 10 ? `0${minutes}` : minutes;
      secondsInput.value = seconds < 10 ? `0${seconds}` : seconds;
    }
  }, 10);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(startIntervalId);
  remainingMilliseconds = currentMilliseconds; // Save the remaining time
  startIntervalId = null;
}

// Function to reset the timer
function resetTimer() {
  stopTimer();
  remainingMilliseconds = null; // Reset the remaining time
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  circle.style.strokeDashoffset = 986.96;
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

cancelButton.disabled = true;
startStopButton.addEventListener('click', () => {
  if (startIntervalId === null) {
    let totalMilliseconds;
    if (remainingMilliseconds !== null) {
      // Use remaining time if available
      totalMilliseconds = remainingMilliseconds;
      remainingMilliseconds = null; // Reset remaining time
    } else {
      const hours = parseInt(hoursInput.value) || 0;
      const minutes = parseInt(minutesInput.value) || 0;
      const seconds = parseInt(secondsInput.value) || 0;
      totalMilliseconds = convertToMilliseconds(hours, minutes, seconds);
    }

    startStopButton.textContent = 'Stop';
    startTimer(totalMilliseconds); // Start the timer with totalMilliseconds

    circle.style.setProperty('--time', `${totalMilliseconds / 1000}s`);
    cancelButton.disabled = false;
    startStopButton.classList.remove('start-button');
    startStopButton.classList.add('stop-button');
  }
  else {
    startStopButton.textContent = 'Start';
    stopTimer();
    startStopButton.classList.remove('stop-button');
    startStopButton.classList.add('start-button');
  }
});

cancelButton.addEventListener('click', () => {
  resetTimer();
  cancelButton.disabled = true;
  alarmSound.pause();
  alarmSound.currentTime = 0;
});

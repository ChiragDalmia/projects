const timer = document.querySelector('.js-timer');
const startStopButton = document.querySelector('.js-start-stop-button');
const lapResetButton = document.querySelector('.js-lap-reset-button');
const message = document.querySelector('.js-message');
const lapCount = document.querySelector('.js-lap-count');
const jslapTime = document.querySelector('.js-lap-time');
let startIntervalId = null;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let lapTimes = []; // Array to store lap times


function startTimer() {
  startIntervalId = setInterval(() => {
    milliseconds += 10;
    if (milliseconds === 1000) {
      seconds++;
      milliseconds = 0;
    }
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      minutes = 0;
    }
    const millisecondsFormatthed = Math.floor(milliseconds / 10).toString().padStart(2, '0');

    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millisecondsFormatthed}`;

    if (minutes === 60) {
      stopTimer();
      alert('Timer max reached');
    }
  }, 10);
}
function stopTimer() {
  clearInterval(startIntervalId);
  startIntervalId = null;
}
function resetTimer() {
  stopTimer();
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  lapTimes = [];
  timer.textContent = '00:00.00';
  message.innerHTML = '';
  lapResetButton.textContent = 'Lap';
}
function lapTimer() {
  const lapTime = timer.textContent;
  lapTimes.push(lapTime);

  // Create lap list if it does not exist
  let lapList = document.querySelector('.js-lap-list');
  if (!lapList) {
    lapList = document.createElement('ul');
    lapList.classList.add('js-lap-list');
    // Append the lap list to a parent element in your DOM
    message.appendChild(lapList); // Append the list to the 'message' element or another suitable parent
  }
  
  // Create a new list item for the current lap
  const lapItem = document.createElement('li');
  lapItem.innerHTML = `
    <div class="lap-count">
      Lap ${lapTimes.length}
    </div>
    <div class="lap-time">
      ${lapTime}
    </div>`;
  
  // Append the new lap time to the list
  lapList.prepend(lapItem);
}



// Attach event listeners to buttons

lapResetButton.disabled = true;
startStopButton.addEventListener('click', () => {
  if (startIntervalId === null) {
    startStopButton.textContent = 'Stop';
    startTimer();
    // enable lap button
    lapResetButton.disabled = false;
    startStopButton.classList.remove('start-button');
    startStopButton.classList.add('stop-button');
    lapResetButton.textContent = 'Lap';
  } else {
    startStopButton.textContent = 'Start';
    stopTimer();
    startStopButton.classList.remove('stop-button');
    startStopButton.classList.add('start-button');
    lapResetButton.textContent = 'Reset';
  }
});

lapResetButton.addEventListener('click', () => {
  if (startIntervalId === null) {
    resetTimer();
    
    // disable lap button
    lapResetButton.disabled = true;
  } else {
    lapTimer();
  }
});


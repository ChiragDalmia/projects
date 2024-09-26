const number = document.getElementById('number');
let counter = 0;
let percent = 99;
let intervalDuration = 20;
let interval;

function startCounter(targetPercent, duration) {
  if (interval) return; // Prevent multiple instances

  percent = targetPercent || 99;
  intervalDuration = duration || 20;

  function updateCounter() {
    if (counter >= percent) {
      counter = percent; // Ensure counter doesn't exceed percent
      number.textContent = `${counter}%`;
      emitCompletionEvent(); // Emit a custom event with your message
      return;
    }

    counter += 1;
    number.textContent = `${counter}%`;
    interval = setTimeout(updateCounter, intervalDuration);
  }

  updateCounter();
}

function emitCompletionEvent() {
  alert('Shit, you were 1% away from Escaping the Matrix');
}

// Start the counter
startCounter(99, 20);

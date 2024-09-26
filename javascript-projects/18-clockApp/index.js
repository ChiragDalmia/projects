setInterval(setClock, 1000);


const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');
setClock();
function setClock() {
  requestAnimationFrame(setClock);
  const currentDate = new Date();
  const millisecondsRatio = currentDate.getMilliseconds() / 1000;
  const secondsRatio = (millisecondsRatio + currentDate.getSeconds()) / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}


function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360);
}








const apiKey = 'a62914b622c455f4fb120b58a52372f7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

searchButton.addEventListener('click', () => {
  if (searchInput.value) {
    getWeatherData(searchInput.value);
  }
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter' && searchInput.value) {
    getWeatherData(searchInput.value);
  }
});

async function getWeatherData(cityName) {
  const response = await fetch(apiUrl + cityName + '&appid=' + apiKey);
  
  if (response.status === 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
    searchInput.value = '';
  } else if (response.ok) {
    const data = await response.json();
    updateWeatherData(data);
    searchInput.value = '';
  }
}

function updateWeatherData(data) {
  document.querySelector('.city').innerText = data.name;
  document.querySelector('.temp').innerText = `${Math.round(data.main.temp)}°C`;
  document.querySelector('.humidity').innerText = `${data.main.humidity}%`;
  document.querySelector('.wind').innerText = `${data.wind.speed}km/h`;

  const weatherIcons = {
    'Clouds': 'images/clouds.png',
    'Rain': 'images/rain.png',
    'Snow': 'images/snow.png',
    'Clear': 'images/clear.png',
    'Drizzle': 'images/drizzle.png',
    'Mist': 'images/mist.png'
  };
  weatherIcon.src = weatherIcons[data.weather[0].main] || 'images/clear.png';

  document.querySelector('.weather').style.display = 'block';
  document.querySelector('.error').style.display = 'none';
}

const submit = document.querySelector('#get');

submit.addEventListener('click', () => {
  const userInput = document.querySelector('#city').value
  fetchData(userInput);
})


function fetchData(city) {
  const API_KEY = "ee9026ec030dc639f0b87dc659093b9d";
  let unit = 'metric'
  let lat;
  let lon;

  const cityName = () => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  }

  
  function showWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`)
    .then(response => response.json())
    .then(data => {
      const newDiv = document.createElement('div');
      newDiv.className = 'info-container'
      newDiv.innerHTML = `
      <h2>${cityName()}: </h2>
      <ul> 
        <li>temperature: ${data.main.temp}&deg;C  </li>
        <li>description: ${data.weather[0].description} </li>
        <li>humidity: ${data.main.humidity}% </li>
        <li>wind speed: ${data.wind.speed}m/s </li>
      </ul>
      `;
      document.body.appendChild(newDiv)
    })
    .catch(error => {
      console.log('Error with weather: ', error)
      container.innerHTML = 'Error fetching weather'
    });


  }
  
  function findCoordinates (city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
    .then(response => response.json())
    .then((data) => {
      lat = data[0].lat
      lon = data[0].lon
      showWeather()
    })
    .catch(error => {
      console.log('Error with city: ', error)
      container.innerHTML = 'Invalid city'
    });
  }

  findCoordinates(city)
}



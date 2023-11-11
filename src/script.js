function updateWeatherInterface(response) {
  let cityElement = document.querySelector("#city");
  let city = response.data.city;
  cityElement.innerHTML = city;

  let countryElement = document.querySelector("#country");
  let country = response.data.country;
  countryElement.innerHTML = country;

  /* format date function */

  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}°`;

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = description;
  /* capitalize first letters? */

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = response.data.temperature.feels_like;
  feelsLikeElement.innerHTML = `${feelsLike}°`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;
  windSpeedElement.innerHTML = `${windSpeed} mi/hr`;
}

function searchCity(city) {
  let apiKey = "28d0aee1bcta18bbbo316447fb1d0b49";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherInterface);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-text");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-input");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Boston");

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
  let description = response.data.condition.description.toUpperCase();
  descriptionElement.innerHTML = description;
  /* capitalize first letters? */

  let feelsLikeElement = document.querySelector("#feels-like");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  feelsLikeElement.innerHTML = `${feelsLike}°`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity}%`;

  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeed = response.data.wind.speed;
  windSpeedElement.innerHTML = `${windSpeed} mi/hr`;

  let windDirectionElement = document.querySelector("#wind-direction");
  let windDegree = response.data.wind.degree;
  windDirectionElement.innerHTML = getWindDirection(windDegree);
}

function searchCity(city) {
  let apiKey = "28d0aee1bcta18bbbo316447fb1d0b49";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherInterface);
}

function getWindDirection(degree) {
  let direction;

  if (degree < 11.25 || degree >= 348.75) {
    direction = "N";
  } else {
    if (degree >= 11.25 && degree < 33.75) {
      direction = "NNE";
    } else {
      if (degree >= 33.75 && degree < 56.25) {
        direction = "NE";
      } else {
        if (degree >= 56.25 && degree < 78.75) {
          direction = "ENE";
        } else {
          if (degree >= 78.75 && degree < 101.25) {
            direction = "E";
          } else {
            if (degree >= 101.25 && degree < 123.75) {
              direction = "ESE";
            } else {
              if (degree >= 123.75 && degree < 146.25) {
                direction = "SE";
              } else {
                if (degree >= 146.25 && degree < 168.75) {
                  direction = "SSE";
                } else {
                  if (degree >= 168.75 && degree < 191.25) {
                    direction = "S";
                  } else {
                    if (degree >= 191.25 && degree < 213.75) {
                      direction = "SSW";
                    } else {
                      if (degree >= 213.75 && degree < 236.25) {
                        direction = "SW";
                      } else {
                        if (degree >= 236.25 && degree < 258.75) {
                          direction = "WSW";
                        } else {
                          if (degree >= 258.75 && degree < 281.25) {
                            direction = "W";
                          } else {
                            if (degree >= 281.75 && degree < 303.75) {
                              direction = "WNW";
                            } else {
                              if (degree >= 303.75 && degree < 326.25) {
                                direction = "NW";
                              } else {
                                if (degree >= 326.25 && degree < 348.75) {
                                  direction = "NNW";
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return direction;
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-text");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-input");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Boston");

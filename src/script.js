function updateWeatherInterface(response) {
  let cityElement = document.querySelector("#city");
  let city = response.data.city;
  if (city != undefined) {
    cityElement.innerHTML = city;
  } else {
    alert("The city could not be found. Please try again.");
    return;
  }

  let date = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");
  let amPmElement = document.querySelector("#am-pm");
  dateElement.innerHTML = formatDate(date);
  timeElement.innerHTML = formatTime(date);
  amPmElement.innerHTML = getAmPm(date);

  let countryElement = document.querySelector("#country");
  let country = response.data.country;
  countryElement.innerHTML = country;

  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}°`;

  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description.toUpperCase();
  descriptionElement.innerHTML = description;

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

  let iconElement = document.querySelector("#icon");
  let icon = response.data.condition.icon_url;
  let iconAltText = response.data.condition.icon;
  iconElement.innerHTML = `<img
            src=${icon}
            alt=${iconAltText}
            class="current-weather-icon"
          />`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "28d0aee1bcta18bbbo316447fb1d0b49";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherInterface);
}

function formatDate(date) {
  let day = date.getDate();
  let year = date.getFullYear();

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = daysOfWeek[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${dayOfWeek}, ${month} ${day}, ${year}`;
}

function formatTime(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour === 13) {
    hour = 1;
  } else {
    if (hour === 14) {
      hour = 2;
    } else {
      if (hour === 15) {
        hour = 3;
      } else {
        if (hour === 16) {
          hour = 4;
        } else {
          if (hour === 17) {
            hour = 5;
          } else {
            if (hour === 18) {
              hour = 6;
            } else {
              if (hour === 19) {
                hour = 7;
              } else {
                if (hour === 20) {
                  hour = 8;
                }
                if (hour === 21) {
                  hour = 9;
                } else {
                  if (hour === 22) {
                    hour = 10;
                  } else {
                    if (hour === 23) {
                      hour = 11;
                    } else {
                      if (hour === 24) {
                        hour = 12;
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

  return `${hour}:${minutes}`;
}

function getAmPm(date) {
  let hour = date.getHours();
  let amPm;

  if (hour <= 11) {
    amPm = "am";
  } else {
    amPm = "pm";
  }

  return `${amPm}`;
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

/* Forecast Code */
function getForecast(city) {
  let apiKey = "28d0aee1bcta18bbbo316447fb1d0b49";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast">
            <div class="forecast-left">${day}</div>
            <div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
                alt="few-clouds-day"
                class="forecast-icon"
              />
            </div>
            <ul class="forecast-right">
              <li class="daily-description">DESCRIPTION</li>
              <li class="daily-average">Average: —</li>
              <li class="daily-high-low">High: —<br />Low: —</li>
            </ul>
          </div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}

searchCity("Boston");

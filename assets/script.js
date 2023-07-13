// Global variables
var APIKey = "7700e19d13089f026d6e1e644f2228fe";
var city;
var searchHistory = [];

// Function to handle form submission and initiate weather search
function search(event) {
  event.preventDefault();
  var input = document.getElementById("searchInput").value;
  city = input;

  var searchHistoryContainer = document.getElementById("search-history");
  searchHistory.unshift(input);

  if (searchHistory.length > 5) {
    searchHistory.pop();
  }

  var searchHistoryEntry = document.createElement("button");
  searchHistoryEntry.innerText = input;
  searchHistoryEntry.addEventListener("click", function() {
    city = this.innerText;
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    fetchWeather(apiURL);
  });
  searchHistoryContainer.insertBefore(searchHistoryEntry, searchHistoryContainer.firstChild);

  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  fetchWeather(apiURL);
}

// Function to fetch weather data
function fetchWeather(apiURL) {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      var longitude = data.coord.lon;
      var latitude = data.coord.lat;
      var temperature = (data.main.temp - 273.15) * 9 / 5 + 32;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;

      displayData(temperature, wind, humidity);

      var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
      fetch(forecastURL)
        .then(response => response.json())
        .then(data => {
          var forecast = data.list;
          displayFiveDayForecast(forecast);
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

function displayFiveDayForecast(forecast) {
  var forecastContainer = document.getElementById("forecast-container");
  forecastContainer.innerHTML = "";

  var uniqueDates = []; // Array to store unique dates

  forecast.forEach(forecastData => {
    var dateTime = new Date(forecastData.dt_txt);
    var date = dateTime.toLocaleDateString("en-US");

    if (!uniqueDates.includes(date) && uniqueDates.length < 5) {
      uniqueDates.push(date);

      var temperature = (forecastData.main.temp - 273.15) * 9 / 5 + 32;
      var wind = forecastData.wind.speed;
      var humidity = forecastData.main.humidity;
      var weatherIcon = forecastData.weather[0].icon;
      var weatherCode = forecastData.weather[0].id;

      var forecastEntry = document.createElement("div");
      forecastEntry.classList.add("forecast-entry");

      var dateElement = document.createElement("p");
      dateElement.innerText = date;

      var temperatureElement = document.createElement("p");
      temperatureElement.innerText = temperature;

      var windElement = document.createElement("p");
      windElement.innerText = "Wind: " + wind;

      var humidityElement = document.createElement("p");
      humidityElement.innerText = "Humidity: " + humidity;

      var weatherIconElement = document.createElement("i");
      weatherIconElement.classList.add("wi", "wi-owm-" + weatherIcon);

      var weatherEmojiElement = document.createElement("span");
      weatherEmojiElement.classList.add("weather-emoji");
      var weatherEmoji = getWeatherEmoji(weatherCode);
      weatherEmojiElement.innerText = weatherEmoji;

      forecastEntry.appendChild(dateElement);
      forecastEntry.appendChild(temperatureElement);
      forecastEntry.appendChild(windElement);
      forecastEntry.appendChild(humidityElement);
      forecastEntry.appendChild(weatherIconElement);
      forecastEntry.appendChild(weatherEmojiElement);

      forecastContainer.appendChild(forecastEntry);
    }
  });
}

// Function to display search history
function displaySearchHistory() {
  var searchHistoryContainer = document.getElementById("search-history");
  searchHistoryContainer.innerHTML = "";

  for (var i = 0; i < searchHistory.length; i++) {
    var searchHistoryEntry = document.createElement("button");
    searchHistoryEntry.innerText = searchHistory[i];
    searchHistoryEntry.addEventListener("click", function() {
      city = this.innerText;
      var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
      fetchWeather(apiURL);
    });
    searchHistoryContainer.appendChild(searchHistoryEntry);
  }
}

// Function to display weather data on the page
function displayData(temperature, wind, humidity) {
  document.getElementById("temperature").innerText = temperature + " °F";
  document.getElementById("wind").innerText = wind;
  document.getElementById("humidity").innerText = humidity;
}

// Helper function to map weather codes to emojis
function getWeatherEmoji(weatherCode) {
  var emojiMap = {
    200: "⛈️", // Thunderstorm
    300: "🌦️", // Drizzle
    500: "🌧️", // Rain
    600: "❄️", // Snow
    700: "🌫️", // Mist
    800: "☀️", // Clear
    801: "🌤️", // Few clouds
    802: "⛅", // Scattered clouds
    803: "🌥️", // Broken clouds
    804: "☁️" // Overcast clouds
  };

  return emojiMap[weatherCode] || "";
}

// Event listener for search form submission
document.getElementById("search-form").addEventListener("submit", search);

// Call the displaySearchHistory function when the page loads
window.addEventListener("load", displaySearchHistory);

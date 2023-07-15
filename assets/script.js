 // Global variables
 // Made my APIKey a variable
var APIKey = "7700e19d13089f026d6e1e644f2228fe";

 // decalared city without initializing it
var city;

 // create a function and initialized an emtpy array variable to store search history 
var searchHistory = [];

 // Function to handle form submission and initiate weather search
 // created function called search that takes an event object as a parameter
 // Submit the form when a search is initiated 
function search(event) {
   event.preventDefault(); // Prevents the default form submission value

// retrieves the value entered in the inout field (;searchInput') and assigns it to the 'input variable
  var input = document.getElementById("searchInput").value;

// assigning the value 'input' to the variable 'city'
  city = input;

// GET the DOM element with the id ' search-history' and assigned it to the variable 'searchHistoryContainer'
  var searchHistoryContainer = document.getElementById("search-history");

// adds the input value to the beginning of the searchHistory array 
  searchHistory.unshift(input);

// checking the length of the 'searchHistory' is greater than 5
  if (searchHistory.length > 5) {


// Removes the last element from the searchHistory array if its length is greater than 5, 
// keeping only the most recent 5 search entries.
  searchHistory.pop();
}
// Save search history to local storage
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

// Created a new button element and assigned it to the var 'searchHistoryEntry'
  var searchHistoryEntry = document.createElement("button");

// Setting text content of the searchHistoryEntry button to the input value
  searchHistoryEntry.innerText = input;

// Adds a click event listener to the searchHistoryEntry button.
  searchHistoryEntry.addEventListener("click", function() {

// this assigns the text content of the clicked button to the var city
    city = this.innerText;

//  created variable apiURL using the city and APIKey variables to fetch weather data.
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

// calling the fetchWeather function with the apiURL 
  fetchWeather(apiURL);
});

// inserting
  searchHistoryContainer.insertBefore(searchHistoryEntry, searchHistoryContainer.firstChild);

  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  fetchWeather(apiURL);
}

// Declares a function named fetchWeather that takes an apiURL parameter.
// This function is responsible for fetching weather data from the provided API URL.
function fetchWeather(apiURL) {

// Initiates a network request to the API URL and returns a promise.
  fetch(apiURL)

// chains a promise callback that converts the response to JSON format.
  .then(response => response.json())

//Chains a promise callback that receives the JSON data retrieved from 
  .then(data => {

// extracts the longitude value from the API response and assigns it to the longitude variable.
  var longitude = data.coord.lon;

// extracts the latitude value from the API response and assigns it to the latitude variable.
  var latitude = data.coord.lat;

// Calculates the temperature in Fahrenheit using the temperature value from the API response 
// and assigns it to the temperature variable.
  var temperature = (data.main.temp - 273.15) * 9 / 5 + 32;

//  extracts the wind speed value from the API response and assigns it to the wind variable.
  var wind = data.wind.speed;

// Extracts the humidity value from the API response and assigns it to the humidity variable.
  var humidity = data.main.humidity;

// calls the displayData function to display the retrieved weather data on the page.
  displayData(temperature, wind, humidity);

//Constructs the forecast API URL using the latitude, longitude, and APIKey variables to fetch the five-day forecast data.
  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;

// Initiates a network request to the forecast API URL and returns a promise.
  fetch(forecastURL)

// Chains a promise callback that converts the response to JSON format.
  .then(response => response.json())

// Chains a promise callback that receives the JSON data retrieved from the forecast API.
  .then(data => {

// Extracts the forecast data from the API response and assigns it to the forecast variable.
  var forecast = data.list;

// Calls the displayFiveDayForecast function to display the five-day forecast data on the page.
displayFiveDayForecast(forecast);
})

// console logging any errors  
  .catch(error => console.log(error));
})
  .catch(error => console.log(error));
}

// Declares a function named displayFiveDayForecast that takes the forecast parameter.
// This function is responsible for displaying the five-day forecast data on the page.
function displayFiveDayForecast(forecast) {

// DOM element with the ID "forecast-container" and assigns it to the variable forecastContainer.
var forecastContainer = document.getElementById("forecast-container");
// Clears the content of the forecastContainer by setting its innerHTML to an empty string.
forecastContainer.innerHTML = "";
//  Declares an empty array variable uniqueDates to store unique dates for filtering the forecast data.
var uniqueDates = []; 

// Iterates over each element in the forecast array using a forEach loop
forecast.forEach(forecastData => {
// Converts the date string from the forecast data into a JavaScript Date object and assigns it to the dateTime variable.
var dateTime = new Date(forecastData.dt_txt);

//  Converts the dateTime to a locale-specific date string and assigns it to the date variable.
var date = dateTime.toLocaleDateString("en-US");

// Checks if the date is not already present in the uniqueDates array and the number of unique dates is less than 5.
if (!uniqueDates.includes(date) && uniqueDates.length < 5) {
// Adds the date to the uniqueDates array.
uniqueDates.push(date);
 
// Calculates the temperature in Fahrenheit using the temperature value from the forecast data
// and assigns it to the temperature variable.
  var temperature = (forecastData.main.temp - 273.15) * 9 / 5 + 32;
// Extracts the wind speed value from the forecast data and assigns it to the wind variable.
  var wind = forecastData.wind.speed;
// Extracts the humidity value from the forecast data and assigns it to the humidity variable.
  var humidity = forecastData.main.humidity;
// Extracts the weather icon value from the forecast data and assigns it to the weatherIcon variable.
  var weatherIcon = forecastData.weather[0].icon;
// Extracts the weather code value from the forecast data and assigns it to the weatherCode variable.
  var weatherCode = forecastData.weather[0].id;

// Creates a new div element and assigns it to the forecastEntry variable.
// Adds the CSS class "forecast-entry" to the forecastEntry div element.
  var forecastEntry = document.createElement("div");
  forecastEntry.classList.add("forecast-entry");

// Creates a new paragraph element and assigns it to the dateElement variable.
// Sets the text content of the dateElement paragraph to the date value.
  var dateElement = document.createElement("p");
  dateElement.innerText = date;

// Creates a new paragraph element and assigns it to the temperatureElement variable.
// Sets the text content of the temperatureElement paragraph to the temperature value.
  var temperatureElement = document.createElement("p");
  temperatureElement.innerText = temperature;

// Creates a new paragraph element and assigns it to the windElement variable.
// Sets the text content of the windElement paragraph to the concatenation of the string "Wind: " and the wind value.
  var windElement = document.createElement("p");
  windElement.innerText = "Wind: " + wind;

// Creates a new paragraph element and assigns it to the humidityElement variable.
// Sets the text content of the humidityElement paragraph to the concatenation of the string "Humidity: " and the humidity value.
  var humidityElement = document.createElement("p");
  humidityElement.innerText = "Humidity: " + humidity;

// Creates a new i element and assigns it to the weatherIconElement variable.
// Adds CSS classes "wi" and "wi-owm-" concatenated with the weatherIcon value to the weatherIconElement.
  var weatherIconElement = document.createElement("i");
  weatherIconElement.classList.add("wi", "wi-owm-" + weatherIcon);

// Creates a new span element and assigns it to the weatherEmojiElement variable.
var weatherEmojiElement = document.createElement("span");
// Adds the CSS class "weather-emoji" to the weatherEmojiElement span.
weatherEmojiElement.classList.add("weather-emoji");
// Calls the getWeatherEmoji function with the weatherCode value and assigns the returned emoji to the weatherEmoji variable.
var weatherEmoji = getWeatherEmoji(weatherCode);
// Sets the text content of the weatherEmojiElement span to the weatherEmoji value.
weatherEmojiElement.innerText = weatherEmoji;

// appending all these elements as a child 
forecastEntry.appendChild(dateElement);
forecastEntry.appendChild(temperatureElement);
forecastEntry.appendChild(windElement);
forecastEntry.appendChild(humidityElement);
forecastEntry.appendChild(weatherIconElement);
forecastEntry.appendChild(weatherEmojiElement);

// appends the forecastEntry div as a child of the forecastContainer element.
forecastContainer.appendChild(forecastEntry);
}
});
}

// Declares a function named displaySearchHistory responsible for displaying the search history on the page
function displaySearchHistory() {
// Retrieves the DOM element with the ID "search-history" and assigns it to the variable searchHistoryContainer.
  var searchHistoryContainer = document.getElementById("search-history");
// Clears the content of the searchHistoryContainer by setting its innerHTML to an empty string.
  searchHistoryContainer.innerHTML = "";
// Retrieve search history from local storage
  var storedSearchHistory = localStorage.getItem("searchHistory");
  if (storedSearchHistory) {
  searchHistory = JSON.parse(storedSearchHistory);
  }
// Iterates over the elements in the searchHistory array using a for loop.
  for (var i = 0; i < searchHistory.length; i++) {
// Creates a new button element and assigns it to the searchHistoryEntry variable.
  var searchHistoryEntry = document.createElement("button");
// Sets the text content of the searchHistoryEntry button to the value of searchHistory at index i.
  searchHistoryEntry.innerText = searchHistory[i];
//  Adds a click event listener to the searchHistoryEntry button
  searchHistoryEntry.addEventListener("click", function() {
// Assigns the text content of the clicked button to the variable city
  city = this.innerText;
// Constructs the API URL using the city and APIKey variables to fetch weather data.
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
// Calls the fetchWeather function with the constructed API URL.
  fetchWeather(apiURL);
});
// Appends the searchHistoryEntry button as a child of the searchHistoryContainer element.
  searchHistoryContainer.appendChild(searchHistoryEntry);
}
}

// Call the displaySearchHistory function when the page loads
window.addEventListener("load", displaySearchHistory);

 // Declares a function named displayData responsible for displaying the weather data on the page.
function displayData(temperature, wind, humidity) {
// Sets the text content of the element with the ID "temperature" to the temperature value followed by the string " °F".
  document.getElementById("temperature").innerText = temperature + " °F";
// Sets the text content of the element with the ID "wind" to the wind value.
  document.getElementById("wind").innerText = wind;
// Sets the text content of the element with the ID "humidity" to the humidity value.
  document.getElementById("humidity").innerText = humidity;
}


// Helper function to map weather codes to emojis
// Declares a function named getWeatherEmoji that takes a weatherCode parameter
// This function maps weather codes to corresponding emojis.
// Declares and initializes an object emojiMap that maps weather codes to emojis.
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

// Returns the emoji corresponding to the provided weatherCode from the emojiMap object
// If the code is not found, an empty string is returned.
return emojiMap[weatherCode] || "";
}

// submit event listener to the element with the ID "search-form" that triggers the search function when the form is submitted.
document.getElementById("search-form").addEventListener("submit", search);

 // Adds a load event listener to the window object that triggers the displaySearchHistory function when the page finishes loading.
window.addEventListener("load", displaySearchHistory);
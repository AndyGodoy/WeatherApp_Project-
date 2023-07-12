// Global variables, what needs to be stored and referenced in multiple functions
    // store API keys
    var APIKey = "7700e19d13089f026d6e1e644f2228fe";
    var city;

    // API Calls ??? 
    var apiURL = `http://api.openweathermap.org/data/2.5/weather?q=SanFrancisco&appid=7700e19d13089f026d6e1e644f2228fe`;

     // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} 


// request URLS with specific variable names
   // element selectors



// Functions- Break this into 2 major functions .
   //  Getting/Manipulating data
   //  Displaying on the page
   // recent searches - checks localStorage 


// search function()
function search(){
      // take in input
      var input = document.getElementById("searchInput").ariaValueMax;
      city = input;
      // fetch request to an APIS
      fetch("http://api.openweathermap.org/data/2.5/weather?q=SanFrancisco&appid=7700e19d13089f026d6e1e644f2228fe")
      .then(response => response.json())
      .then(data => {
      // recieve back and extract the cordinate data 
      var longitude = data.coord.lon;
      var latitude = data.coord.lat;
      // longitude and latitude 
      // calling weather function with cordinates
      weather(latitude, longitude);
})


// Function weather(){
      function weather(latitude, longitude) {
      // Use those cordinates from first fetch 
      // and make another Fetch request 
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`)
      .then(response => response.json())
      .then(data => {
      // Convert to JSON format
      // Extract temperature, wind, and humidity from the object data
      var temperature= data.main.temp;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;

      // call the displayData function
      dissplayData(temperature, wind, humidity);
      })

      .catch(error => console.log(error));
}

// Create funtion to display data to page 
function displayData(temperature, wind, humidity){
      // Display the data to the page 
      document.getElementById("temperature").innerText = temperature;
      document.getElementById("wind").innerText = wind;
      document.getElementById("humidity").innerText = humidity;
      // 5 day forecast, each has like 25 elements in each one!
      // 29 things that need to changed/altered 
      // Convert the date 
}
// Store search history 
  // update the recent searches function 


  // add event listeners 
  document.getElementById("searchButton").addEventListener("click", search);
    // recent search(click event, event.target)
    // targeting the text on the button- google it
}
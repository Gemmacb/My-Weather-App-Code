let now = new Date();

//array of days
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//array of months
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

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
//get current date
let currentDate = `${day}, ${date} ${month}`;
//change text to current date
let h2 = document.querySelector("#date");
h2.innerHTML = currentDate;

//format hours
let hours = now.getHours();
if (hours < 10) hours = `0${hours}`;

//format mins
let minutes = now.getMinutes();
if (minutes < 10) minutes = `0${minutes}`;

//get current time
let currentTime = `${hours}:${minutes}`;
let h3 = document.querySelector("#time");
h3.innerHTML = currentTime;

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "16662a3e5c5f9a459abcbac1b11b0a73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//get city, temp and weather of user current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//display the city, temperature and weather of the city entered
function displayWeatherCondition(response) {
  document.querySelector("#user-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

//search city api call
function searchCity(city) {
  let apiKey = "16662a3e5c5f9a459abcbac1b11b0a73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//get the city that was entered and submitted
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text").value;
  searchCity(city);
}

//listen and action when submit is clicked
let cityForm = document.querySelector("#city-form-text");
cityForm.addEventListener("submit", handleSubmit);

//default city search
searchCity("New York");

//current location button
let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

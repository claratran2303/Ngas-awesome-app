// ⏰Feature Show current date and time
let now= new Date();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Dec"
];

let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let day=days[now.getDay()];

let month = months[now.getMonth()];

let year= now.getFullYear();

let minute=now.getMinutes();
if (minute<10){
  minute=`0${minute}`;
}else{
  minute=`${minute}`;
}

let hour=now.getHours();

if (hour<10){
  hour=`0${hour}`;
}else{
  hour=`${hour}`;
}

let nowDate=document.querySelector("#today-date");
nowDate.innerHTML=`${month} ${year} ${day} ${hour}:${minute}`;

// 🕵️‍♀️Feature show Weather of searching City

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let niceCityName=response.data.name;  
  let status=response.data.weather[0].description;
  
  
  let todayTemp = document.querySelector("#today-temperature");
  let todayCity=document.querySelector("#today-city"); 
  let todayStatus=document.querySelector(".status-today");
  
  todayTemp.innerHTML =`${temperature}`;
  todayCity.innerHTML=`${niceCityName}`;
  todayStatus.innerHTML=`${status}`;
}

function searchCity (city){
  let apiKey = "d3c8204f4c4db0d26947b9ed2cb7ac82";
  let apiRoot="https://api.openweathermap.org/data/2.5/weather?q"
  let apiUrl = `${apiRoot}=${city}&appid=${apiKey}&&units=metric`;;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event){
    event.preventDefault();
    let city=document.querySelector("#city-input").value;      
    searchCity(city);
}
let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSubmit);

// 😍 show Weather of Current Location
 
function handleFoundCity(response){
  let FoundCity=response.data[0].name;
  searchCity(FoundCity);
}
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude; 
  let apiKey = "d3c8204f4c4db0d26947b9ed2cb7ac82";
  let apiRoot = "http://api.openweathermap.org/geo/1.0/reverse?";
  let apiUrl = `${apiRoot}lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(handleFoundCity);
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton=document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click",getCurrentLocation);

// 🙀Feature C F Degree

let cDegree=document.querySelector("#c-degree");
let fDegree=document.querySelector("#f-degree");
function toFDegree(event){
  event.preventDefault();
  let todayTemperature=document.querySelector("#today-temperature");
  todayTemperature.innerHTML=`${todayTemperature.innerHTML*1.8+32}`;
}
function toCDegree(event){
  event.preventDefault();
  let todayTemperature=document.querySelector("#today-temperature");
  todayTemperature.innerHTML=`${(todayTemperature.innerHTML-32)/1.8}`;
}

cDegree.addEventListener("click",toCDegree);
fDegree.addEventListener("click",toFDegree);


























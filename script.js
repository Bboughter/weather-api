var APIkey = "792acd53a4130029a12f98144cca09f3";
var searchBtn = $(".btn");
var searchInput = document.querySelector('.form-control')



searchBtn.click(function (event) {
    event.preventDefault();
    var city = searchInput.value.trim();
    if (city) {
        weatherQuery(city);
        city.value = "";
    }
});

function weatherQuery() {

    var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIkey + "&units=imperial";
    fetch(queryCurrentWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    printCurrentWeather();
    })
}

var currentWeather = document.querySelector(".current-card");

function printCurrentWeather()  {

    var currentWeatherCard= document.createElement('div');
    
    var currentWeatherBody = document.createElement('div');

    currentWeatherCard.append(currentWeatherBody);

    var currentTemp = document.createElement('p');
    currentTemp.textContent=data.list[0].main.temp

    var currentHumidity = document.createElement('p')
    currentHumidity.textContent = data.list[0].main.humidity

    var currentWind = document.createElement('p');
    currentWind.textContent =data.list[0].wind.speed

    currentWeatherBody.append(currentCity, currentTemp, currentHumidity, currentWind)
    currentWeather.append(currentWeatherCard)
}

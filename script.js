var APIkey = '792acd53a4130029a12f98144cca09f3'
var searchBtn = $(".btn");

for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".cities-searched").addclass("cities");
    cityName.apped("<li>" + city + "</li>")
}

var count = 0;

searchBtn.click(function() {
    var searchInput = $('.form-control');
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIkey + "&units=imperial";
    var fiveDayForcast = "api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + APIkey + "&units=imperial";
     if searchInput == "") { 
         console.log(searchInput);
     } else {
        $.ajax({
            url: currentWeather,
            method: "GET"
        }).then (function(response) {
            var cityName = $(".cities-searched").addclass("cities");
            cityName.apped("<li>" + response.name + "</li>")
            var local = localStorage.setItem(count, response.name);
            count = count + 1;

            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
    
            var currentTemp = currentName.append("<p>");
        
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
    
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
        })
     }
    });
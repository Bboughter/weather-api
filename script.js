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
        })
     }
    });
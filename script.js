var APIkey = '792acd53a4130029a12f98144cca09f3'
var searchBtn = $(".btn");

for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".cities-searched").addclass("cities");
    cityName.apped("<li>" + city + "</li>")
}
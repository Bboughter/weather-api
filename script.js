var APIkey = "792acd53a4130029a12f98144cca09f3";
var searchBtn = $(".btn");

for (var i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".cities-searched");
    cityName.append("<li>" + city + "</li>")
}



searchBtn.click(function() {
    var searchInput = $('.form-control');
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIkey + "&units=imperial";
    var fiveDayForcast = "api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + APIkey + "&units=imperial";
     if (searchInput == "") { 
         console.log(searchInput);
     } else {
        $.ajax({
            url: currentWeather,
            method: "GET"
        }).then (function(response) {
            var cityName = $(".cities-searched");
            cityName.append("<li>" + response.name + "</li>")

            var currentCard = $(".current-card").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
    
            var currentTemp = currentName.append("<p>");
        
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
    
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

        })
    }

        $.ajax({
            url: fiveDayForcast,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayDiv = $(".five-day").addClass("card-text");
            fiveDayDiv.empty();
            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div>" + "<p>" + FiveDayTimeUTC1 + "</p>" + "<p>" + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
    })
})
})
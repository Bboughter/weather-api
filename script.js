var APIkey = "792acd53a4130029a12f98144cca09f3";
var searchBtn = $(".btn");
var searchInput = document.querySelector('.search')

searchBtn.on('click', getCurrentWeatherAPI)


function displayFiveDayForecast(card, date, temp, wind, humidity){
    var dateCurrent = dayjs.unix(date).format('MM/DD/YYYY');
   
    var currentDate = card.querySelector('.date')
    var currentTemp = card.querySelector('.temperature')

    currentDate.innerHTML=currentDate.innerHTML + ' ' + dateCurrent
    currentTemp.innerHTML=currentTemp.innerHTML + ' ' + temp
}

function getFiveDayWeatherData() {

    var queryFiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput.value + "&appid=" + APIkey + "&units=imperial";
    
    fetch(queryFiveDayWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(weatherData) {
        var data = weatherData.list
        var fiveDayCards = document.querySelectorAll('.day-forecast')
        console.log(fiveDayCards)
        var index = 0
        for(var i =0; i <=32; i = i+8){
            console.log(2)
            var unixDate = data[i].dt
            var temp = data[i].main.temp
            var humidity = data[i].main.humidity
            var wind = data[i].wind.speed

            
            displayFiveDayForecast(fiveDayCards[index], unixDate, temp, wind,humidity)
            index = index + 1
        }
      });
  };


function getCurrentWeatherAPI(event) {
    event.preventDefault();

    var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + APIkey + "&units=imperial";
    
    fetch(queryCurrentWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var dateCurrent = dayjs.unix(data.dt).format('MM/DD/YYYY');
        var currentWeather = document.querySelector('.current-card');
        var currentDate = currentWeather.querySelector('.date')
        currentDate.innerHTML=currentDate.innerHTML + ' ' + dateCurrent
        
        var currentTemp =currentDate

        getFiveDayWeatherData()

        // currentWeather.innerHTML='';

    // var currentWeatherCard = document.createElement('div')
    // currentWeatherCard.classList.add('card')     
    // currentWeatherCard.innerHTML= dateCurrent + '\n' + "Temperature: " + data.main.temp + "°F" + "Wind: " + data.wind.speed + "MPH" + "" +
    // "Humidity: " + data.main.humidity + "%";

    // var currentWeatherBody = document.createElement('div')
    // currentWeatherCard.append(currentWeatherBody)
    // currentWeather.append(currentWeatherCard)
 
    })
}






// searchBtn.on('click', getCurrentWeatherAPI)
// function getCurrentWeatherAPI(queryCurrentWeather) {

//     var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput.value + "&appid=" + APIkey + "&units=imperial";
    
//     fetch(queryCurrentWeather)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//         var dateCurrent = dayjs.unix(data.dt).format('MM/DD/YYYY');
//         var currentWeather = document.querySelector('.current-card');
//         currentWeather.innerHTML='';

//     var currentWeatherCard = document.createElement('div')
//     currentWeatherCard.classList('card')     
//     currentWeatherCard.innerHTML= dateCurrent + '' + "Temperature: " + data.main.temp + "°F" + '' + "Wind: " + data.wind.speed + "MPH" + "" +
//     "Humidity: " + data.main.humidity + "%";

//     var currentWeatherBody = document.createElement('div')
//     currentWeatherCard.append(currentWeatherBody)

 
    
  
//         for (var i = 0; i < data.list.length; i++) {
//           var fiveDay = dayjs(data.list[i].dt_txt ).format('MM/DD/YYYY');
//           if (data.list[i].dt_txt.includes("12:00:00")) {
//               console.log(data.list[i]);
//               var cardInfo = document.createElement("div");
//               cardInfo.classList.add("card");
//               cardInfo.innerHTML = fiveDay + "Temperature: " + data.list[i].main.temp + '°F' + "Wind Speed: " + data.list[i].wind.speed + 'MPH' + "Humidity: " + data.list[i].main.humidity + '%'
              
            
//             }
//         }
//       });
//   };
  
// //   function localFunction () {
// //   var searchedCity = JSON.parse(localStorage.getItem('searchedCity'));
  
// //         if (!searchedCity){
// //         localStorage.setItem('searchedCity', JSON.stringify([input.value]));
// //         }else {
// //         searchedCity.push(input.value);  
// //         localStorage.setItem('searchedCity', JSON.stringify(searchedCity));
// //         }
// //       }
  
// //       function createBtn () {
// //         var cityResponse = JSON.parse(localStorage.getItem('searchedCity'));
// //         var searchHistory = document.querySelector(".searchhistory");
// //         for (var i = 0; i < cityResponse.length; i++) {
// //           var searchHistoryBtn = document.createElement("button");
// //           searchHistoryBtn.innerText=cityResponse[i];
// //           searchHistory.append(searchHistoryBtn);
// //         }
// //       }


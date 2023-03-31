var APIkey = "792acd53a4130029a12f98144cca09f3";
var searchBtn = $(".btn");
var searchInput = document.querySelector('.search')

searchBtn.on('click', getCurrentWeatherAPI)
function getCurrentWeatherAPI(queryCurrentWeather) {

    var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + APIkey + "&units=imperial";
    
    fetch(queryCurrentWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var dateCurrent = dayjs.unix(data.dt).format('MM/DD/YYYY');
        var currentWeather = document.querySelector('.current-card');
        currentWeather.innerHTML='';

    var currentWeatherCard = document.createElement('div').
    currentWeatherCard.classList('card');   
    currentWeatherCard.innerHTML= dateCurrent + '' + "Temperature: " + data.main.temp + "°F" + '' + "Wind: " + data.wind.speed + "MPH" + "" +
    "Humidity: " + data.main.humidity + "%";

    var weatherContainer = document.createElement('div');
    weatherContainer.classList.add('weather-container');
    weatherContainer.appendChild(currentWeatherCard);
    document.body.appendChild(weatherContainer);
    })
}

// submitBtn.addEventListener("click", function () {
//     fetch(
//       "https://api.openweathermap.org/data/2.5/forecast?q=" +
//         input.value +
//         "&appid=ce895f0400d0fe16be29264e2d060cb6"
//     )
//       .then(function (response) {
//         return response.json();
        
//       })
//       .then(function (data) {
//         console.log(data);
//         var card = document.querySelector(".card-element");
//         card.innerHTML='';
  
//         for (var i = 0; i < data.list.length; i++) {
//           var fiveDay = dayjs(data.list[i].dt_txt ).format('MM/DD/YYYY');
//           if (data.list[i].dt_txt.includes("12:00:00")) {
//               console.log(data.list[i]);
//               var cardInfo = document.createElement("div");
//               cardInfo.classList.add("card");
//               cardInfo.innerHTML =
//                 "<div class='card-body'><h5 class='card-title' id='forcastdate'>" +
//                 fiveDay +
//                 "</h5><h6 class='card-subtitle mb-2 text-muted'>" +
//                 "Temperature: " + 
//                 data.list[i].main.temp + '°F' +
//                 "<h6 class='card-subtitle mb-2 text-muted'>" +
//                 "Wind Speed: " +
//                 data.list[i].wind.speed + 'MPH' +
//                 "<h6 class='card-subtitle mb-2 text-muted'>" +
//                 "Humidity: " +
//                 data.list[i].main.humidity + '%' +
//                 "<h6></div>";
              
//               card.append(cardInfo);
//             }
//         }
//       });
//   });
  
//   function localFunction () {
//   var searchedCity = JSON.parse(localStorage.getItem('searchedCity'));
  
//         if (!searchedCity){
//         localStorage.setItem('searchedCity', JSON.stringify([input.value]));
//         }else {
//         searchedCity.push(input.value);  
//         localStorage.setItem('searchedCity', JSON.stringify(searchedCity));
//         }
//       }
  
//       function createBtn () {
//         var cityResponse = JSON.parse(localStorage.getItem('searchedCity'));
//         var searchHistory = document.querySelector(".searchhistory");
//         for (var i = 0; i < cityResponse.length; i++) {
//           var searchHistoryBtn = document.createElement("button");
//           searchHistoryBtn.innerText=cityResponse[i];
//           searchHistory.append(searchHistoryBtn);
//         }
//       }



// function printCurrentWeather()  {

//     var currentWeatherCard= document.createElement('div');
    
//     var currentWeatherBody = document.createElement('div');

//     currentWeatherCard.append(currentWeatherBody);

//     var currentTemp = document.createElement('p');
//     currentTemp.textContent=data.list[0].main.temp

//     var currentHumidity = document.createElement('p')
//     currentHumidity.textContent = data.list[0].main.humidity

//     var currentWind = document.createElement('p');
//     currentWind.textContent =data.list[0].wind.speed

//     currentWeatherBody.append(currentCity, currentTemp, currentHumidity, currentWind)
//     currentWeather.append(currentWeatherCard)
// }

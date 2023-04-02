var APIkey = "792acd53a4130029a12f98144cca09f3";
var searchBtn = $(".btn");
var searchInput = document.querySelector('.search')
var searchResultsEl = document.querySelector('.cities-searched')
var searchedCities = []

searchBtn.on('click', getCurrentWeatherAPI)


function displayFiveDayForecast(card, date, temp, wind, humidity) {
    var dateCurrent = dayjs.unix(date).format('MM/DD/YYYY');

    var fiveDayDate = card.querySelector('.date')
    var fiveDayTemp = card.querySelector('.temperature')
    var fiveDayWind = card.querySelector('.wind')
    var fiveDayHumidity = card.querySelector('.humidity')

    fiveDayDate.innerHTML = fiveDayDate.innerHTML + ' ' + dateCurrent;
    fiveDayTemp.innerHTML = fiveDayTemp.innerHTML + ' ' + temp + '°F';
    fiveDayWind.innerHTML = fiveDayWind.innerHTML + ' ' + 'MPH';
    fiveDayHumidity.innerHTML = fiveDayHumidity.innerHTML + ' ' + '%'
}

function getFiveDayWeatherData() {

    var queryFiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput.value + "&appid=" + APIkey + "&units=imperial";

    fetch(queryFiveDayWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (weatherData) {
            console.log(weatherData)
            var fiveDayCards = document.querySelectorAll('.day-forecast')
            var index = 0
            for (var i = 0; i <= 32; i = i + 8) {
                var unixDate = weatherData.list[i].dt
                var temp = weatherData.list[i].main.temp
                var humidity = weatherData.list[i].main.humidity
                var wind = weatherData.list[i].wind.speed


                displayFiveDayForecast(fiveDayCards[index], unixDate, temp, wind, humidity)
                index = index + 1
            }
        });
};


function getCurrentWeatherAPI(event) {
    event.preventDefault();

    var queryCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + APIkey + "&units=imperial";

    fetch(queryCurrentWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            var searches = JSON.parse(localStorage.getItem('searchedCities'));
            if (searches) {
                searchedCities = []
                searches.forEach(search => searchedCities.push(search))
            }
            searchedCities.push(searchInput.value);
            localStorage.setItem('searchedCities', JSON.stringify(searchedCities))


            var dateCurrent = dayjs.unix(data.dt).format('MM/DD/YYYY');
           
            var currentWeather = document.querySelector('.current-card');
            
            var currentDate = currentWeather.querySelector('.date')
            currentDate.innerHTML = currentDate.innerHTML + ' ' + dateCurrent
           
            var currentDayIcon = document.createElement('img');
            currentDayIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            currentDayIcon.alt = 'weather icon';
            currentDayIcon.width = 150;
            currentDayIcon.height = 150;
           
            currentWeather.append(currentDayIcon)
            
            var currentTemp = document.querySelector('.temperature')
            currentTemp.innerHTML = currentTemp.innerHTML + ' ' + data.main.temp + '°F'

            var currentWind = document.querySelector('.wind');
            currentWind.innerHTML = currentWind.innerHTML + ' ' + data.wind.speed + ' ' + 'MPH'

            var currentHumidity = document.querySelector('.humidity')
            currentHumidity.innerHTML = currentHumidity.innerHTML + ' ' + data.main.humidity + '%'

            getFiveDayWeatherData()
            displayCities()
        }
        )}

    function displayCities() {
        searchResultsEl.innerHTML = ""
        if (searchedCities) {
            searchedCities.forEach(item => {
                var displayEl = document.createElement('li');
                displayEl.textContent = item;
                searchResultsEl.appendChild(displayEl);
            })
        }
    }

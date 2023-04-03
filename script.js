var APIkey = "792acd53a4130029a12f98144cca09f3";
var searchBtn = $(".btn");
var searchInput = document.querySelector('.search')
var searchResultsEl = document.querySelector('.cities-searched')
var searchedCities = []

searchBtn.on('click', getCurrentWeatherAPI)


function displayFiveDayForecast(card, date, temp, wind, humidity) {
    var dateCurrent = dayjs.unix(date).format('MM/DD/YYYY');
    var fiveDayImage = card.querySelector('card-heading')
    var fiveDayDate = card.querySelector('.date')
    var fiveDayTemp = card.querySelector('.temperature')
    var fiveDayWind = card.querySelector('.wind')
    var fiveDayHumidity = card.querySelector('.humidity')
    // var fiveDayIcon = document.createElement('img')
    fiveDayDate.innerHTML = fiveDayDate.innerHTML + ' ' + dateCurrent;
    fiveDayTemp.innerHTML = fiveDayTemp.innerHTML + ' ' + temp + '°F';
    fiveDayWind.innerHTML = fiveDayWind.innerHTML + ' ' + + wind + 'MPH';
    fiveDayHumidity.innerHTML = fiveDayHumidity.innerHTML + ' ' + humidity + '%'
    // fiveDayIcon.src = icon + `https://openweathermap.org/img/w/${weatherData.list[i].weather[0].icon}.png`;
    // currentDayIcon.alt = 'weather icon';
    // currentDayIcon.width = 150;
    // currentDayIcon.height = 150;
    // fiveDayImage.append(fiveDayIcon)
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
                // var icon = weatherData.list[i].weather[0].icon

                displayFiveDayForecast(fiveDayCards[index], unixDate, temp, wind, humidity)
                index = index + 1
            }
        });
};


function getCurrentWeatherAPI(event) {
    event.preventDefault();

    clearWeatherData();

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
        )
}

function clearWeatherData() {
    // clear current weather data
    var currentWeather = document.querySelector('.current-card');
    currentWeather.querySelector('.date').innerHTML = '';
    currentWeather.querySelector('.temperature').innerHTML = '';
    currentWeather.querySelector('.wind').innerHTML = '';
    currentWeather.querySelector('.humidity').innerHTML = '';
    var currentDayIcon = document.querySelector('.current-card img');
    if (currentDayIcon) {
        currentDayIcon.remove();
    }

    // clear five day weather data
    var fiveDayCards = document.querySelectorAll('.day-forecast')
    fiveDayCards.forEach(card => {
        card.querySelector('.date').innerHTML = '';
        card.querySelector('.temperature').innerHTML = '';
        card.querySelector('.wind').innerHTML = '';
        card.querySelector('.humidity').innerHTML = '';
    })
}

function displayCities() {
    searchResultsEl.innerHTML = "";

    if (searchedCities) {
        searchedCities.forEach(item => {
            var displayEl = document.createElement("li");
            var displayButton = document.createElement("button");
            displayButton.textContent = item;
            displayButton.addEventListener("click", function () {

                getCurrentWeatherAPI(this.textContent);
            });

            displayEl.appendChild(displayButton);
            searchResultsEl.appendChild(displayEl);
        });
    }
}

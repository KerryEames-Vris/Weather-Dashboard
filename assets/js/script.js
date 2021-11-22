var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
var cityList = $("#city-list");
var searchForm = $("#search-form");
var searchedCity = $("#searched-city");
var todaysWeather = document.getElementById("todaysWeather");
var weekWeather = document.getElementById("weekWeather");

// City search history

function saveCities(event) {
  event.preventDefault();
  var cityInput = $("#city-input").val();
  if (cityInput === "") {
    return;
  } else {
    storedCities.push(cityInput);
    localStorage.setItem("cities", JSON.stringify(storedCities));
    $("#city-input").val("");
    renderCities();
  }
}

function renderCities() {
  if (storedCities.length >= 8) {
    storedCities.shift(7);
    cityList.text("");
    for (var i = 0; i < storedCities.length; i++) {
      var cityListItem = $(
        '<button class="btn btn-secondary special-button mt-1 mb-2" id="searched-city"></button>'
      );
      cityListItem.text(storedCities[i]);
      cityListItem.attr("data-index", i);
      cityList.prepend(cityListItem);
    }
  } else {
    cityList.text("");
    for (var i = 0; i < storedCities.length; i++) {
      var cityListItem = $(
        '<button class="btn btn-secondary special-button mt-1 mb-2" id="searched-city"></button>'
      );
      cityListItem.text(storedCities[i]);
      cityListItem.attr("data-index", i);
      cityList.prepend(cityListItem);
    }
  }
}

searchForm.on("submit", saveCities);

renderCities();

// Search previous results

function saveSearchedCities(event) {
  event.preventDefault();
  var cityInput = searchedCity.text();
  console.log(cityInput);
  storedCities.push(cityInput);
  localStorage.setItem("cities", JSON.stringify(storedCities));
  searchedCity.val("");
  renderCities();
}

searchedCity.click(saveSearchedCities);

// API call to get weather info

function getWeather() {
  todaysWeather.removeChild(cityDate);
  todaysWeather.removeChild(forecastDetails);
  weekWeather.removeChild(weekCard);

  var newCity = storedCities[storedCities.length];
  var cityUrl =
    "api.openweathermap.org/data/2.5/forecast/daily?q=" +
    newCity +
    "&cnt=6&APPID=b838f6a74f084064314505e05fecb924";
  fetch(cityUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var cityDate = document.createElement("h3");
      var forecastDetails = document.createElement("ul");
      var tempDetails = document.createElement("li");
      var windDetails = document.createElement("li");
      var humDetails = document.createElement("li");
      var forecastDetails2 = document.createElement("ul");
      var tempDetails2 = document.createElement("li");
      var windDetails2 = document.createElement("li");
      var humDetails2 = document.createElement("li");
      var uvDetails = document.createElement("li");
      var weekCard = document.createElement("div");
      var weekCardDetail = document.createElement("div");
      var dateOnly = document.createElement("h3");

      cityDate.classList.add("customTitle");
      cityDate.textContent = data[0].city.name + " " + data[0].list.dt;
      forecastDetails.classList.add("noDots");
      forecastDetails2.classList.add("noDots");
      tempDetails.textContent = "Temp: " + data[0].list.temp.day;
      windDetails.textContent = "Wind: " + data[0].list.speed;
      humDetails.textContent = "Humidity: " + data[0].list.humidity;
      //

      todaysWeather.append(cityDate);
      todaysWeather.append(forecastDetails);
      forecastDetails.append(tempDetails);
      forecastDetails.append(windDetails);
      forecastDetails.append(humDetails);
      //

      var getLat = data[0].city.coord.lat;
      var getLon = data[0].city.coord.lon;

      var uvUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        getLat +
        "&lon=" +
        getLon +
        "&exclude=hourly,daily&appid=b838f6a74f084064314505e05fecb924";

      fetch(cityUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var uvResult = document.createElement("button");
          var uvCurrent = data[0].current.uvi;
          if (uvCurrent < 2) {
            uvResult.classList.add("uvNumber");
          } else if (uvCurrent >= 2 && uvCurrent < 5) {
            uvResult.classList.add("uvNumber2");
          } else if (uvCurrent >= 5 && uvCurrent < 7) {
            uvResult.classList.add("uvNumber3");
          } else if (uvCurrent >= 8) {
            uvResult.classList.add("uvNumber4");
          }
          uvResult.textContent = uvCurrent;
          uvDetails.textContent = "UV Index: " + uvResult;
          forecastDetails.append(uvDetails);
        });

      for (var i = 1; i < data.length; i++) {
        weekCard.classList.add("col-auto", "mb-3");
        weekCardDetail.classList.add("card", "my-5");
        dateOnly.classList.add("customTitle");
        dateOnly.textContent = data[i].list.dt;
        tempDetails2.textContent = data[i].list.temp.day;
        windDetails2.textContent = data[i].list.speed;
        humDetails2.textContent = data[i].list.humidity;

        weekWeather.append(weekCard);
        weekCard.append(weekCardDetail);
        weekCardDetail.append(dateOnly);
        weekCardDetail.append(forecastDetails2);
        forecastDetails2.append(tempDetails2);
        forecastDetails2.append(windDetails2);
        forecastDetails2.append(humDetails2);
      }
    });
}

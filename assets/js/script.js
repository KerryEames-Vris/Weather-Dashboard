var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
var cityList = $("#city-list");
var searchForm = $("#search-form");

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
        '<button class="btn btn-secondary special-button mt-1 mb-2"></button>'
      );
      cityListItem.text(storedCities[i]);
      cityListItem.attr("data-index", i);
      cityList.prepend(cityListItem);
    }
    cityList.text("");
    for (var i = 0; i < storedCities.length; i++) {
      var cityListItem = $(
        '<button class="btn btn-secondary special-button mt-1 mb-2"></button>'
      );
      cityListItem.text(storedCities[i]);
      cityListItem.attr("data-index", i);
      cityList.prepend(cityListItem);
    }
  } else {
    cityList.text("");
    for (var i = 0; i < storedCities.length; i++) {
      var cityListItem = $(
        '<button class="btn btn-secondary special-button mt-1 mb-2"></button>'
      );
      cityListItem.text(storedCities[i]);
      cityListItem.attr("data-index", i);
      cityList.prepend(cityListItem);
    }
  }
}

searchForm.on("submit", saveCities);

renderCities();

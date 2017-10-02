$(document).ready(function() {

  var long, lat, fTemp, cTemp, kTemp;

  if (navigator.geolocation) {
  // Get geolocation of user
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;

    // API url with geolocation
    var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=df8b0828fb64bb25d0f46b170d854f6e";

      // JSON call for Open Weather API
      $.getJSON(api, function(data) {
      var tempSwap = true;
      var weatherType = data.weather[0].description;
      kTemp = data.main.temp;
      var windSpeed = Math.round(data.wind.speed*2.237);
      var clouds = data.clouds.all;
      var humidity = data.main.humidity;
      var city = data.name;
      var country = data.sys.country;

      // weatherType Icon from OpenWeatherMap API
      var img = new Image();
      var div = document.getElementById('weatherType');

      img.onload = function() {
        div.appendChild(img);
      };

      img.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";



      // Temperature in Kelvin to fahrenheit
      fTemp = Math.round(kTemp*(9/5)-459.67) + " &#8457";

      // Temperature in Kelvin to Celsius
      cTemp = Math.round(kTemp-273) + " &#8451";

      console.log(city);
      console.log(api);
      console.log(fTemp);
      $("#city").html(city + ", " + country);
      $("#weatherType").html(weatherType + " ");
      $("#fTemp").html(fTemp);
      // Switch between Fahrenheit and Celsius
      $("#fTemp").click(function() {

        if(tempSwap===true) {
          $("#fTemp").html(cTemp);
          tempSwap=false;
        }

        else {
          $("#fTemp").html(fTemp);
          tempSwap=true;
        }

      });
      $("#windSpeed").html("Wind speed: " + windSpeed + " mph, ");
      $("#clouds").html(clouds + "% cloud cover, ");
      $("#humidity").html(humidity + "% humidity");

     });

    });

  };

});

  

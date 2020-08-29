$(document).ready(function(){

$("#search-button").on("click", function(){
    event.preventDefault();    
    var city = $("#search-value").val();
    $("#search-value").val("");
 
    weather(city);
    
    
});

//this function will display current info
function locationInfo(cityLocation, temp, humidity, windSpeed, weatherEl){
  
  $("#location").empty();
  $("#temp").empty();
  $("#humidity").empty();
  $("#wind").empty();


  $("#location").append(cityLocation, weatherEl);
  $("#temp").append(temp);
  $("#humidity").append(humidity);
  $("#wind").append(windSpeed);
  
 
}


// function will gather the data from the API
function weather(city) {
 
  var api = "e6cbb66fefd604779e451fd9dd1fdb04";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response);
   
    var cityLocation = response.name;
    var temp = "Temperature: " + response.main.temp + " °F";
    var humidity = "Humidity: " + response.main.humidity + " %";
    var windSpeed = "Wind Speed: " + response.wind.speed + " MPH";
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    
    //weather icon linking
    var weatherIcon = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
    var weatherEl =  $("<image>").html("<img src='" + iconURL + "'>");
    
   
     //these functions are now called to display info of the weather
    getforecast(city);
    uvIndex(api, latitude, longitude);
    locationInfo(cityLocation, temp, humidity, windSpeed, weatherEl);
   

  });


}


function getforecast(city) {
  var api = "e6cbb66fefd604779e451fd9dd1fdb04";
  var queryURL= "http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&units=imperial&appid=" + api;
 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response);
   console.log("inside the Forecast function");
    
   var forecastArray = response.list;
     for(var i = 0; i < forecastArray.length;i+= 8){
        
       
        var forecastTemp = forecastArray[i].main.temp;
        var day = (forecastArray[i].dt_txt.split('-')[2].split(' ')[0]);
        var month = (forecastArray[i].dt_txt.split('-')[1].split(' ')[0]);
        var year = (forecastArray[i].dt_txt.split('-')[0].split(' ')[0]);
        var forecastDate = (month + "/"+ day + "/" + year);
       
        console.log("the date "+ month + "/"+ day + "/" + year);
       
        var forecastWeatherIcon = forecastArray[i].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/wn/" + forecastWeatherIcon + ".png";
        var forecastWeatherEl =  $("<image>").html("<img src='" + forecastIconURL + "'>");
       
       
        displayForecast(forecastDate,forecastTemp, forecastWeatherEl);
     
     
      }

    

  });
  
}

function displayForecast(forecastDate, forecastTemp, forecastWeatherEl){
    console.log(forecastDate +" temp: " + forecastTemp);

}


function uvIndex(api, latitude, longitude){
  
  var uvIndexURL= "http://api.openweathermap.org/data/2.5/uvi?appid=" + api +"&lat=" + latitude + "&lon=" + longitude;
 
  
$.ajax({
  url: uvIndexURL,
  method: "GET"
}).then(function(response) {
 
  $("#UV").empty();
  
  var uv = "UV Index: " + response.value;
  $("#UV").append(uv);

  
  


});
}


}); 
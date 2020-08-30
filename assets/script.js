$(document).ready(function(){


var cityTracker = 0;
var lastCities = [];
let key = "cities";



//this function will reload the prevous city
function prefCities(){

  let lastCity= localStorage.getItem(key, lastCities[cityTracker]);

  if(lastCity === null){
    return;
  }else{
    weather(lastCity);
  }
}

prefCities();



$("#search-button").on("click", function(){
    event.preventDefault();    
    var city = $("#search-value").val();
    
    $("#search-value").val("");
 
    weather(city);
    
    var lastList = "#list" + cityTracker;
    $(lastList).text(city);

    //this well set the city to local storage 
    lastCities[cityTracker]= city;
    cityTracker++;
    localStorage.setItem(key, lastCities[cityTracker]);
    if(cityTracker === 5){
      console.log("in if statment reset tracker");
      cityTracker = 0;
    }
    
    var lastList = "#lastList" + cityTracker;
    
});

//this function will display current info
function locationInfo(cityLocation, temp, humidity, windSpeed, weatherEl, date){
  
  $("#location").empty();
  $("#temp").empty();
  $("#humidity").empty();
  $("#wind").empty();


  $("#location").append(cityLocation, date, weatherEl);
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
    
    var date ="  ("+ moment().subtract(10, 'days').calendar() + ") ";
    
    //weather icon linking
    var weatherIcon = response.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
    var weatherEl =  $("<image>").html("<img src='" + iconURL + "'>");
    
   
     //these functions are now called to display info of the weather
    getforecast(city);
    uvIndex(api, latitude, longitude);
    locationInfo(cityLocation, temp, humidity, windSpeed, weatherEl, date);
   

    //local storage
  let key = "cities";

   localStorage.setItem(key, city);

  });


}


function getforecast(city) {
  var api = "e6cbb66fefd604779e451fd9dd1fdb04";
  var queryURL= "http://api.openweathermap.org/data/2.5/forecast?q="+ city + "&units=imperial&appid=" + api;
 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   
    
   var forecastArray = response.list;
     for(var i = 0, j = 1; i < forecastArray.length; i+= 8, j++){
        
       
       //this will convert the day
        var day = (forecastArray[i].dt_txt.split('-')[2].split(' ')[0]);
        var month = (forecastArray[i].dt_txt.split('-')[1].split(' ')[0]);
        var year = (forecastArray[i].dt_txt.split('-')[0].split(' ')[0]);
        var forecastDate = (month + "/"+ day + "/" + year);
        
        var forecastHum = "Humidity: " + forecastArray[i].main.humidity + " %";
        var forecastTemp = "Temp: " + forecastArray[i].main.temp + " °F";

        
       
        
       //this is the icon
        var forecastWeatherIcon = forecastArray[i].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/wn/" + forecastWeatherIcon + ".png";
        var forecastWeatherEl =  $("<image>").html("<img src='" + forecastIconURL + "'>");
       
       
        displayForecast(forecastDate,forecastTemp, forecastWeatherEl, forecastHum,j);
     
     
      }

    

  });
  
}

function displayForecast(forecastDate, forecastTemp, forecastWeatherEl, forecastHum, j){
  
  
     var forecastD = "#forecastDate" + j;
     var forecastI = "#iconForeCast" + j;
     var forecastT = "#forecastTemp" + j;
     var forecastH = "#forecastHum" + j;

    $(forecastD).addClass("card-text").text(forecastDate);
    $(forecastI).html(forecastWeatherEl);
    $(forecastT).addClass("card-text").text(forecastTemp);
    $(forecastH).addClass("card-text").text(forecastHum);


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
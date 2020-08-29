$(document).ready(function(){

$("#search-button").on("click", function(){
    event.preventDefault();    
    var city = $("#search-value").val();
    $("#search-value").val("");
 
    weather(city);
    
});


function locationInfo(cityLocation, temp, humidity, windSpeed){
  
  $("#location").append(cityLocation);
  $("#temp").append(temp);
  $("#humidity").append(humidity);
  $("#wind").append(windSpeed);

}



function weather(city) {
 
  var api = "e6cbb66fefd604779e451fd9dd1fdb04";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response);
   
    var cityLocation = response.name;
    var temp = response.main.temp + " °F";
    var humidity = response.main.humidity + " %";
    var windSpeed = response.wind.speed + " MPH";
    getforecast(city);
    locationInfo(cityLocation, temp, humidity, windSpeed);

  });


}


function getforecast(city) {
  var api = "e6cbb66fefd604779e451fd9dd1fdb04";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response);
  console.log("inside the function");
 

  });
  
}

}); 
$(document).ready(function(){

$("#search-button").on("click", function(){
   event.preventDefault();    
  var city = $("#search-value").val();
   weather(city);
});






function weather(city) {
 
  var api = "e6cbb66fefd604779e451fd9dd1fdb04";
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response);
 console.log("inside the function");


  });
}


}); 
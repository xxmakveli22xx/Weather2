$(document).ready(function(){




console.log("before the click");

var city ="san antonio";  

 var api = "e6cbb66fefd604779e451fd9dd1fdb04"


var queryURL = "api.openweathermap.org/data/2.5/weather?q="+ city+"&appid="+ api;

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

 console.log("inside the function");


  });


});
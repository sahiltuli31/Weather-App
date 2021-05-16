const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const favicon = require('serve-favicon');

app.use(bodyParser.urlencoded({extended : true}))
app.use('/public',express.static(__dirname +'/public'));
app.use(favicon(__dirname + '/public/favicon.png'));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  const city = req.body.CityName;
  const id = "08641e7a65865d9f2c1eb5bd0a89c2f8#";
  const units = "metric";
  const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + id);

  https.get(url,function(response){
    console.log(response.StatusCode);

    response.on("data",function(data){
      const WeatherData = JSON.parse(data);

      const temp = WeatherData.main.temp;
      const discription = WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const i = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1> The Temp in " + city + " is " + temp + " Degree Celcius. </h1> <br> <h3> The Weather is Currently " + discription + ". </h3>");
      res.write("<img src =" + i + ">" );
      res.send();
    })
  })
})







app.listen(process.env.PORT || 3000,function(){
  console.log("Server started on 3000");
})

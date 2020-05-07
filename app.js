//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const direc = require(__dirname + "/direc.js");

require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", (req, res) => {
    const query = req.body.cityName; // city name from the data
    const apiKey = process.env.API_KEY; // get the API key from environment variable
    const unit = "metric"; // keep the unit notation as metric
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    // getting the data from the API call
    https.get(url, (response) => {
        console.log(response.statusMessage);

        if (response.statusCode != 200) {
            res.render("failure");
            return;
        }

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            const windDir = direc.findDirec(weatherData.wind.deg);

            const weatherDataRequired = {
                temperature: Math.floor(weatherData.main.temp),
                weatherDescription: weatherData.weather[0].description,
                weatherMain: weatherData.weather[0].main,
                place: weatherData.name,
                imageUrl: "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png",
                pressure: weatherData.main.pressure,
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed,
                windDirection: windDir,
            };

            res.render("index", { data: weatherDataRequired });
        });
    });
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
});

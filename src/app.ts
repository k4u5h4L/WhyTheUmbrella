//jshint esversion:6

import express, { Application, Request, Response } from "express";
import https from "https";
import bodyParser from "body-parser";
import direc from "./direc";

import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

app.post("/", (req: Request, res: Response) => {
  const query = req.body.cityName; // city name from the data
  const apiKey = process.env.API_KEY; // get the API key from environment variable
  const unit = "metric"; // keep the unit notation as metric
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;

  // getting the data from the API call
  https.get(url, (response) => {
    console.log(response.statusMessage);

    if (response.statusCode != 200) {
      res.render("failure");
      return;
    }

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);

      const windDir = direc(weatherData.wind.deg);

      const weatherDataRequired = {
        temperature: Math.floor(weatherData.main.temp),
        weatherDescription: weatherData.weather[0].description,
        weatherMain: weatherData.weather[0].main,
        place: weatherData.name,
        imageUrl:
          "http://openweathermap.org/img/wn/" +
          weatherData.weather[0].icon +
          "@2x.png",
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        windDirection: windDir,
      };

      res.render("index", { data: weatherDataRequired }); // sending an object to the ejs filee
    });
  });
});

app.post("/failure", (req: Request, res: Response) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

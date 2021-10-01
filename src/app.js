const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//app.use(express.static(path.join(__dirname, "../public"))); // way to customize server

// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rona Remoga",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the Robot",
    name: "Rona Remoga",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is a help text message",
    title: "Help",
    name: "Rona Remoga",
  });
});

app.get("/weather", (req, res) => {
  //console.log(req.query.address);
  if (!req.query.address) {
    res.send({ error: "You must provide an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Rona Remoga",
    message: "Help Article not found",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Rona Remoga",
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

// app.get() - this function lets us configure what the server should do when someone tries to get resource at a specific url
// req - request
// res - response
// app.listen() - listen on a specific port for the moment
// app.com
// app.com/help
// app.com/about
// to run it on the terminal use this command node src/app.js

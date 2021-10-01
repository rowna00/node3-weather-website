const request = require("request");
const forecast = (latitude, longtitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=daca7419650e3b1db6824511613105b9&query=" +
    latitude +
    ", " +
    longtitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out." +
          "It feels like " +
          body.current.feelslike +
          " degrees out and the humidity is " +
          body.current.humidity +
          "."
      );
    }
  });
};

module.exports = forecast;

import { useState } from "react";
import { weatherCodes } from "./WeatherCodes";

export default function SearchSection({ updateWeatherInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function getWeatherInfo(url) {
    try {
      let response = await fetch(url);
      let jsonResponse = await response.json();
      console.log(jsonResponse);

      // Convert sunrise timestamp to readable time
      const sunriseTimestamp = jsonResponse.sys.sunrise;
      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunriseTime = sunriseDate.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      let result = {
        temp: Math.floor(jsonResponse.main.temp),
        description: jsonResponse.weather[0].description,
        feelsLike: jsonResponse.main.feels_like,
        humidity: jsonResponse.main.humidity,
        wind: jsonResponse.wind.speed,
        visibility: jsonResponse.visibility,
        pressure: jsonResponse.main.pressure,
        sunrise: sunriseTime,
        weatherIcon: Object.keys(weatherCodes).find((icon) =>
          weatherCodes[icon].includes(jsonResponse.weather[0].id)
        ),
      };

      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(city);
      // setCity("");
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      let newInfo = await getWeatherInfo(API_URL); //result
      updateWeatherInfo(newInfo);
    } catch (error) {
      setError(true);
    }
  }

  async function handleLocationSearch() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

      let response = await fetch(API_URL);
      let jsonResponse = await response.json();

      // Set city name in input box
      setCity(jsonResponse.name);

      let newInfo = await getWeatherInfo(API_URL);
      updateWeatherInfo(newInfo);
    });
  }

  return (
    <>
      <div className="search-section">
        <form onSubmit={handleSubmit} className="search-form">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Enter location"
            required
            className="search-input"
            value={city}
            onChange={handleChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <button className="location-button" onClick={handleLocationSearch}>
          <i className="fa-solid fa-location-crosshairs"></i>
        </button>
      </div>
      {error && <p style={{ color: "red" }}>No such place found!</p>}
    </>
  );
}

import { useState } from "react";
import { useEffect } from "react";
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import SearchSection from "./SearchSection";

export default function WeatherApp() {
  let [weatherInfo, setWeatherInfo] = useState({});

  useEffect(() => {
    const defaultWeather = {
      temp: 32,
      description: "Clear sky",
      feelsLike: 34,
      humidity: 40,
      wind: 5,
      visibility: 10000,
      pressure: 1012,
      sunrise: "6:05 am",
      weatherIcon: "clear", // or any icon key from your weatherCodes
    };

    setWeatherInfo(defaultWeather);
  }, []);

  function updateWeatherInfo(newInfo) {
    setWeatherInfo(newInfo);
  }

  return (
    <div className="container">
      {/* Search section */}
      <SearchSection updateWeatherInfo={updateWeatherInfo} />

      {/* Weather section */}
      <div className="weather-section">
        <CurrentWeather info={weatherInfo} />

        {/*Hourly Weather section */}
        <HourlyWeather info={weatherInfo} />
      </div>
    </div>
  );
}

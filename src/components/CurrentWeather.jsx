export default function CurrentWeather({info}) {
  return (
    <div className="current-weather">
      <img src={`icons/${info.weatherIcon}.svg`} className="weather-icon" />
      <h2 className="temp">
        {info.temp}<span>&deg;C</span>
      </h2>
      <p className="description">{info.description}</p>
    </div>
  );
}

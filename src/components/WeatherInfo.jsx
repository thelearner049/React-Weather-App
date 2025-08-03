export default function WeatherInfo({info}) {
  return (
    <div className="hourly-forecast">
      <ul className="weather-list">
        <li className="weather-item">
          <p className="prop temp">Feels Like</p>
          <i className="fa-solid fa-temperature-low weather-icon"></i>
          <p className="prop-value">{info.temp}&deg;C</p>
        </li>
        <li className="weather-item">
          <p className="prop ">Wind</p>
          <i className="fa-solid fa-wind weather-icon"></i>
          <p className="prop-value">{info.wind}Km/h</p>
        </li>
        <li className="weather-item">
          <p className="prop">Humidity</p>
          <i className="fa-solid fa-droplet weather-icon"></i>
          <p className="prop-value">{info.humidity}%</p>
        </li>
        <li className="weather-item">
          <p className="prop">Visiblity</p>
          <i className="fa-solid fa-eye weather-icon"></i>
          <p className="prop-value">{info.visibility/1000}Km</p>
        </li>
        <li className="weather-item">
          <p className="prop">Pressure</p>
          <img src="icons/tire-pressure2.svg" className="weather-icon" />
          <p className="prop-value">{info.pressure}hPa</p>
        </li>
        <li className="weather-item">
          <p className="prop">Sunrise</p>
          <img src="icons/clouds.svg" className="weather-icon" />
          <p className="prop-value">{info.sunrise}</p>
        </li>
      </ul>
    </div>
  );
}

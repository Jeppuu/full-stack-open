import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ lat, lon, capital, apiKey }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon || !apiKey) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((res) => setWeather(res.data))
      .catch(() => setError("Weather data not available"));
  }, [lat, lon, apiKey]);

  if (error) return <p className="weather-error">{error}</p>;
  if (!weather) return <p className="weather-loading">Loading weather...</p>;

  return (
    <div className="weather-container">
      <h3 className="weather-title">Weather in {capital}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div className="weather-info">
        <p>
          <span className="label">{weather.weather[0].main}</span>(
          {weather.weather[0].description})
        </p>
        <p>
          <span className="label">Temperature:</span> {weather.main.temp} °C
        </p>
        <p>
          <span className="label">Wind:</span> {weather.wind.speed} m/s
        </p>
      </div>
    </div>
  );
};

export default Weather;

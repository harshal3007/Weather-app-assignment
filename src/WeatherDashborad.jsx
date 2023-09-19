import React, { useState } from 'react';
import WeatherService from './WeatherService';

export const WeatherDashborad = () =>{
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [isCelsius, setIsCelsius] = useState(true);
  
    const handleToggleUnits = () => {
      setIsCelsius((prev) => !prev);
    };
    const handleLocationChange = (e) => {
      setLocation(e.target.value);
    };
  
    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const currentWeather = await WeatherService.getCurrentWeather(location);
        const threeDayForecast = await WeatherService.getThreeDayForecast(location);
        setWeatherData(currentWeather);
        setForecastData(threeDayForecast);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-xl mb-4">Weather Dashboard</h1>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter location (city or zip code)"
            className="px-2 py-1 w-64 border"
          />
          <button type="submit" className="ml-2 px-4 py-1 bg-blue-500 text-white">
            Search
          </button>
        </form>
        <div className="mb-4">
        <label className="mr-2">Units:</label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isCelsius}
            onChange={handleToggleUnits}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Celsius</span>
        </label>
      </div>
        {weatherData && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold mb-2">Current Weather</h2>
          
          <div>
          Temperature: {isCelsius ? `${weatherData.main.temp} °C` : `${(weatherData.main.temp * 9) / 5 + 32} °F`}
            <br />
            Humidity: {weatherData.main.humidity}%
            <br />
            Wind Speed: {weatherData.wind.speed} m/s
            <br />
            Weather: {weatherData.weather[0].description}
          </div>
        </div>
      )}
  
  {forecastData && (
        <div>
          <h2 className="text-xl font-semibold mb-2">3-Day Forecast</h2>
          <div>
            {/* {/ Display 3-day forecast here /} */}
          </div>
        </div>
      )}
      </div>
    );
}
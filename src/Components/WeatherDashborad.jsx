import React, { useState } from 'react';
import { BsSnow2, BsFillSunFill,BsFillCloudSunFill,BsFillCloudRainFill } from 'react-icons/bs';
import {RiCloudWindyLine} from "react-icons/ri"
import WeatherData from './WeatherData';
export const WeatherDashboard = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('celsius');
  const [error, setError] = useState(null);

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const convertTemperature = (value) => {
    const celsius = value - 273.15;
    if (selectedUnit === 'celsius') {
      return `${celsius.toFixed(1)} °C`;
    } else {
      const fahrenheit = (celsius * 9) / 5 + 32;
      return `${fahrenheit.toFixed(1)} °F`;
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Snow':
        return <BsSnow2 />;
      case 'Clouds':
        return <RiCloudWindyLine />;
      case 'Clear':
        return <BsFillSunFill />;
      case 'Rain':
        return <BsFillCloudRainFill />;
      default:
        return <BsFillCloudSunFill />;
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const currentWeather = await WeatherData.getCurrentWeather(location);
      const threeDayForecast = await WeatherData.getThreeDayForecast(location);
      setWeatherData(currentWeather);
      setForecastData(threeDayForecast);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      className="container mx-auto p-8"
      style={{
        background: 'linear-gradient(to bottom, #3498db, #2c3e50)', 
        transition: 'background 0.5s ease',
      }}
    >
       <h1 className="text-xl mb-4">Weather Dashboard</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="search"
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
        <button
          onClick={() => handleUnitChange('celsius')}
          className={`${
            selectedUnit === 'celsius' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          } px-4 py-1 mr-2`}
        >
          Celsius
        </button>
        <button
          onClick={() => handleUnitChange('fahrenheit')}
          className={`${
            selectedUnit === 'fahrenheit' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
          } px-4 py-1`}
        >
          Fahrenheit
        </button>
      </div>
      {weatherData && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold mb-2">Current Weather</h2>

          <div>
          <br />
          {getWeatherIcon(weatherData.weather[0].main)}
          
            Temperature: {convertTemperature(weatherData.main.temp)}
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
          <div className="grid grid-cols-3 gap-4">
            {forecastData.list.slice(0, 3).map((item, index) => {
              const forecastDate = new Date();
              forecastDate.setDate(forecastDate.getDate() + index + 1);

              return (
                <div key={index} className="p-4 bg-gray-100">
                  <h3 className="text-lg font-semibold">
                    Date: {formatDate(forecastDate)}
                  </h3>
                  <p>
                  <br />
                    {getWeatherIcon(item.main.temp_max)} 
                    

                    High: {convertTemperature(item.main.temp_max)}
                    <br />
                    Low: {convertTemperature(item.main.temp_min)}
                    <br />
                    Weather: {item.weather[0].description}
                  
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 font-bold mt-4">
          {error.message}
        </div>
      )}
    </div>
  );
};

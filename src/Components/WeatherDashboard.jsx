import React, { useState } from 'react';
import { BsSnow2, BsFillSunFill, BsFillCloudSunFill, BsFillCloudRainFill } from 'react-icons/bs';
import { RiCloudWindyLine } from "react-icons/ri"
import WeatherData from './WeatherData';
export const WeatherDashboard = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('celsius');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    if (!newLocation) {
      setWeatherData(null);
      setForecastData(null);
    }
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
      setIsLoading(true);

      const currentWeather = await WeatherData.getCurrentWeather(location);
      const threeDayForecast = await WeatherData.getThreeDayForecast(location);

      setWeatherData(currentWeather);
      setForecastData(threeDayForecast);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


  const getWeatherBackgroundColor = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Snow':
        return 'linear-gradient(to bottom, #f1f8ff, #b8d6ff)';
      case 'Clouds':
        return 'linear-gradient(to bottom, #e4e4e4, #b0b0b0)';
      case 'Clear':
        return 'linear-gradient(to bottom, #f6d365, #fda085)';
      case 'Rain':
        return 'linear-gradient(to bottom, #bdd6e6, #89a4c7)';
      case 'Fog':
        return 'linear-gradient(to bottom, #d0d4db, #9398a3)';
      case 'Thunderstorm':
        return 'linear-gradient(to bottom, #60636a, #3c3f45)';
      case 'Haze':
        return 'linear-gradient(to bottom, #d0d4db, #a3b2bf)';
      case 'Mist':
        return 'linear-gradient(to bottom, #d0d4db, #a3b2bf)';
      case 'Dust':
        return 'linear-gradient(to bottom, #d6cec4, #b9ad9c)';
      case 'Light Rain':
        return 'linear-gradient(to bottom, #cad8e3, #a5b7cc)';
      case 'Scattered Clouds':
        return 'linear-gradient(to bottom, #e8eff3, #c0d1e3)';
      default:
        return 'linear-gradient(to bottom, #cad8e3, #a5b7cc)';
    }
  };



  return (
    <div
      className="container mx-auto p-8 min-h-screen"
      style={{
        background: getWeatherBackgroundColor(weatherData?.weather[0]?.main),
        transition: 'background 5s ease',
      }}
    >


<h1 className="text-4xl text-center mb-4 text-black-700">
        Weather Dashboard
      </h1>

      <div className="flex flex-col justify-center items-center w-full py-2 gap-4">
        <form onSubmit={handleSearch} className="w-full flex flex-col sm:flex-row gap-2 justify-center items-center">
          <input
            type="search"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter location (city or zip code)"
            className="px-5 py-3 w-full sm:w-1/2 rounded-lg border-0 border-black outline-none focus:border-black"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Search
          </button>
        </form>
        <div className="mb-4">
          <div className="flex items-center">
            <label
              htmlFor="celsius"
              className={`radio-label ${selectedUnit === 'celsius' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded-full cursor-pointer mr-2 transition duration-300 ease-in-out transform hover:scale-105`}
            >
              <input
                type="radio"
                id="celsius"
                value="celsius"
                checked={selectedUnit === 'celsius'}
                onChange={() => handleUnitChange('celsius')}
                className="hidden"
              />
              °C
            </label>
            <label
              htmlFor="fahrenheit"
              className={`radio-label ${selectedUnit === 'fahrenheit' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                } px-4 py-2 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`}
            >
              <input
                type="radio"
                id="fahrenheit"
                value="fahrenheit"
                checked={selectedUnit === 'fahrenheit'}
                onChange={() => handleUnitChange('fahrenheit')}
                className="hidden"
              />
              °F
            </label>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center mt-8">
          <div className="w-20 h-20 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      {weatherData && (
        <div className="mb-8 border rounded-lg p-4 shadow-md flex flex-col justify-center items-center transition duration-300 transform hover:scale-105">
          <h2 className="text-xl font-semibold mb-2">Current Weather</h2>

          <div className="flex flex-col items-center space-y-2">
            <div className="text-4xl">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>
            <p className="text-lg font-bold mb-2">
              Temperature: {convertTemperature(weatherData.main.temp)}
            </p>
            <p className="mb-1">
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="mb-1">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
            <p className="mb-2">
              Weather: {weatherData.weather[0].description}
            </p>
          </div>
        </div>
      )}


{forecastData && (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">3-Day Forecast</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {forecastData.list.slice(0, 3).map((item, index) => {
        const forecastDate = new Date();
        forecastDate.setDate(forecastDate.getDate() + index + 1);

        return (
          <div
            key={index}
            className="p-4 rounded-lg border border-gray-300 transition-transform hover:scale-105 flex flex-col space-y-2 items-center"
          >
            <h3 className="text-lg font-semibold mb-2">
              Date: {formatDate(forecastDate)}
            </h3>
            <div className="flex flex-col space-y-2 items-center">
              {getWeatherIcon(item.weather[0].main)}
              <p className="text-lg font-bold">
                High: {convertTemperature(item.main.temp_max)}
              </p>
              <p>
                Low: {convertTemperature(item.main.temp_min)}
              </p>
              <p>
                Weather: {item.weather[0].description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}




      {error && (
        <div className="bg-red-200 border border-red-400 text-red-700 rounded-lg p-4 shadow-md mt-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM11 7a1 1 0 00-2 0v5a1 1 0 102 0V7z" clipRule="evenodd" />
            </svg>
            <span className="font-bold">Oops! Something went wrong:</span>
          </div>
          <p className="mt-2">{error.message}</p>
        </div>
      )}

    </div>
  );
};

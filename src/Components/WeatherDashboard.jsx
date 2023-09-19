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
        return 'linear-gradient(to bottom, #3498db, #2c3e50)';
    }
  };



  return (
    <div
      className="container mx-auto p-8 min-h-screen"
      style={{
        background: getWeatherBackgroundColor(weatherData?.weather[0]?.main),
        transition: 'background 2s ease',
      }}
    >

      <h1 className="text-4xl text-center mb-4 text-black-700">
        Weather Dashboard
      </h1>

      <div className="flex flex-col justify-center items-center w-full py-2 gap-4">
  <form onSubmit={handleSearch} className="w-full flex gap-2 justify-center items-center">
    <input
      type="search"
      value={location}
      onChange={handleLocationChange}
      placeholder="Enter location (city or zip code)"
      className="px-5 py-3 w-1/2 rounded-lg border-0 border-black outline-none focus:border-black"
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
        className={`radio-label ${
          selectedUnit === 'celsius' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
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
        className={`radio-label ${
          selectedUnit === 'fahrenheit' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
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


      {weatherData && (
        <div className="mb-8 border flex flex-col justify-center items-center">
          <h2 className="text-xs font-semibold mb-2">Current Weather</h2>

          <div >
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

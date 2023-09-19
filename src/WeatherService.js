import axios from 'axios';

const apiKey = 'YOUR_API_KEY';

const WeatherService = {
  getCurrentWeather: async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching current weather.');
    }
  },
  getThreeDayForecast: async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching 3-day forecast.');
    }
  }
};

export default WeatherService;

import axios from 'axios';

const APIkey = `065d067d498ed087648453e53ec580a1`;

const WeatherData = {
  getCurrentWeather: async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching current weather.');
    }
  },
  getThreeDayForecast: async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIkey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching 3-day forecast.');
    }
  }
};

export default WeatherData;

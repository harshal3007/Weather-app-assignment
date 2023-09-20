# Weather App

This Weather app allows users to check the current weather and a 3-day weather forecast for a specified location.


## Features

- View the current weather, including temperature, humidity, wind speed, and weather condition.
- Switch between Celsius and Fahrenheit temperature units.
- Display weather icons based on the current weather condition (e.g., sunny, rainy, cloudy).
- Check a 3-day weather forecast, including high and low temperatures for each day.
- Responsive design for various screen sizes (desktop, tablet, mobile).

## Technologies Used

- React
- Axios for making API requests
- Tailwind CSS for styling
- React Icons for weather icons
- OpenWeatherMap API for weather data

## Installation

To run this app locally, follow these steps:

1. Clone the repository to your local machine:

   git clone https://github.com/harshal3007/Weather-app-assignment.git

2. Clone the repository to your local machine:

   cd harshal-grouple-assignment

3. Install the required dependencies using npm:

   npm install

4. Get an API key from OpenWeatherMap and replace 'YOUR_API_KEY' with your API key in the WeatherData.js file. Open the src directory and locate the WeatherData.js file. Replace the following line with your API key:

   const APIkey = `YOUR_API_KEY`;

5. Start the development server:
   npm start / npm run start

## Usage

-Enter a location (city or zip code) in the search input and click the "Search" button.

-Toggle between Celsius and Fahrenheit temperature units by selecting the respective radio buttons.

-View the current weather information, including temperature, humidity, wind speed, and weather condition.

-Check the 3-day weather forecast with high and low temperatures for each day.

-If an error occurs (e.g., location not found), an error message will be displayed.


# If you have any suggestions, improvements, or bug fixes, please open an issue or submit a pull request.





<template>
      <div class="container">
        <div class="header">
          <h1>Christian Wu's Weather App</h1>
          <div class="search-bar">
            <input
              type="text"
              v-model="city"
              placeholder="Enter city name"
              class="search-input"
            />
            <button @click="searchByCity" class="search-button">Search</button>
          </div>
        </div>
    
        <main>
          <!-- If there are no data returned, then skip rendering the information -->
          <div v-if="weatherData">
            <!-- Display the weather data attribute returned from API
            Example of API data: https://openweathermap.org/current -->  
            <h2>
              {{ weatherData.name }}, {{ weatherData.sys.country }}
            </h2>
            <div>
              <!-- The image source of the weather icon will be coming from a function called iconUrl
                  which will be shared in script later -->  
              <img :src="iconUrl" alt="Weather Icon" />
              <p>{{ temperature }} °C</p>
            </div>
            <!-- weather[0] means the current weather, the way we need to obtain data depends on how
            the API JSON data looks -->
            <span>{{ weatherData.weather[0].description }}</span>
          </div>
        </main>
      </div>
    </template>
    
    <script>
      // Import axios to handle HTTP requests to the weather API
      import axios from "axios";
    
      // Placeholder for the API key. Replace it with your actual OpenWeatherMap API key.
      const apikey = "1d130cd1d3ce189fd6c6eda8523ad20a"; 
    
      export default {
        name: "WeatherApp",
        data() {
          return {
            city: "", // City name input by the user for searching weather data
            weatherData: null, // Weather data object to store the returned weather details
            hourlyForecast: [], // Array to store hourly forecast data if needed later
            dailyForecast: [], // Array to store daily forecast data if needed later
          };
        },
        // Computed properties to automatically update based on data changes
        computed: {
          // Convert the temperature from Kelvin to Celsius
          temperature() {
            return this.weatherData
              ? Math.floor(this.weatherData.main.temp - 273)
              : null;
          },
          // Generate the URL for the weather icon based on the API response
          iconUrl() {
            return this.weatherData
              ? `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
              : null;
          },
        },
        // Fetch weather data based on current geolocation when the component is mounted
        mounted() {
          this.fetchCurrentLocationWeather();
        },
        methods: {
          // Obtain the current location using browser's geolocation API
          async fetchCurrentLocationWeather() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                // Use the latitude and longitude to get weather data from OpenWeatherMap API
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                await this.fetchWeatherData(url);
              });
            }
          },
          // Make an HTTP GET request to the provided URL and store the returned weather data
          async fetchWeatherData(url) {
            try {
              const response = await axios.get(url);
              // Store the returned data in weatherData
              this.weatherData = response.data;
            } catch (error) {
              console.error("Error fetching weather data:", error);
            }
          },
          // Fetch weather data by city name entered by the user
          async searchByCity() {
            if (this.city) {
              const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
              await this.fetchWeatherData(url);
            }
          },
        },
      };
    </script>
    
    <style scoped>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      text-align: center;
      margin-top: 50px;
    }
    input {
      margin: 10px;
    }
    button {
      margin: 10px;
    }
    </style>
    
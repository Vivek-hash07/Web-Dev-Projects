document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherButton = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "d04710312f61c27a768bb73b0f0ab1ec";

    getWeatherButton.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData); // <-- use weatherData
        } catch (e) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('city not found.');
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden'); // <-- hide weather info
        errorMessage.classList.remove('hidden'); // <-- show error
    }
});

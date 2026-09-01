const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");

const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");

async function getWeather(city) {

    try {
        // Find the city
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            cityName.textContent = "City not found";
            temperature.textContent = "--°C";
            description.textContent = "--";
            return;
        }

        const location = geoData.results[0];

        // Get weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&timezone=auto`
        );

        const weatherData = await weatherResponse.json();

        const currentTemperature = weatherData.current.temperature_2m;
        const weatherCode = weatherData.current.weather_code;

        cityName.textContent = location.name;
        temperature.textContent = `${currentTemperature}°C`;
        description.textContent = getWeatherDescription(weatherCode);

    } catch (error) {

        console.error(error);

        cityName.textContent = "Something went wrong";
        temperature.textContent = "--°C";
        description.textContent = "Please try again";
    }
}


// Convert weather codes into readable descriptions
function getWeatherDescription(code) {

    if (code === 0) {
        return "Clear sky";
    }

    if (code >= 1 && code <= 3) {
        return "Partly cloudy";
    }

    if (code >= 45 && code <= 48) {
        return "Foggy";
    }

    if (code >= 51 && code <= 67) {
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return "Unknown weather";
}


// Search button
searchBtn.addEventListener("click", function () {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city.");
        return;
    }

    getWeather(city);
});


// Press Enter to search
cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchBtn.click();
    }
});
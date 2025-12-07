// =======================
// 1️⃣ DOM SELECTORS
// =======================
const searchInput = document.querySelector("[data-search-input]");
const searchBtn = document.querySelector("[data-search-btn]");

const cityText = document.querySelector("[data-city]");
const tempText = document.querySelector("[data-temp]");
const descriptionText = document.querySelector("[data-description]");
const weatherIcon = document.querySelector("[data-icon]");

const weatherDisplay = document.querySelector("[data-weather-display]");
const extraInfoSection = document.querySelector("[data-extra-info]");
const humidityText = document.querySelector("[data-humidity]");
const windText = document.querySelector("[data-wind]");
const errorMessage = document.querySelector("[data-error]");

// =======================
// 2️⃣ FUNCTIONS
// =======================

const API_KEY = "YOUR-API-KEY"; // replace with your OpenWeatherMap API key

async function getWeather(city) {
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      updateUI(data);
    } else {
      showError("City not found. Try again.");
    }
  } catch (error) {
    showError("Something went wrong. Try again later.");
    console.error(error);
  }
}

function updateUI(data) {
  // Hide error if it was visible
  errorMessage.hidden = true;

  // Show main weather section
  weatherDisplay.hidden = false;
  extraInfoSection.hidden = false;

  cityText.textContent = data.name;
  tempText.textContent = Math.round(data.main.temp) + "°C";
  descriptionText.textContent = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  weatherIcon.alt = data.weather[0].description;

  // Extra info
  humidityText.textContent = data.main.humidity + "%";
  windText.textContent = data.wind.speed + " m/s";
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  weatherDisplay.hidden = true;
  extraInfoSection.hidden = true;
}

// =======================
// 3️⃣ EVENT LISTENERS
// =======================
searchBtn.addEventListener("click", () => {
  getWeather(searchInput.value.trim());
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    getWeather(searchInput.value.trim());
  }
});

// ==================== REAL-TIME WEATHER ENGINE ====================

/**
 * Fetches weather data based on user's GPS coordinates
 * Uses Open-Meteo API (No Key Required)
 */
async function fetchWeather() {
  const bar = document.getElementById('weatherBar');
  
  try {
    // 1. Request user location
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 });
    });
    
    const { latitude: lat, longitude: lon } = position.coords;

    // 2. Fetch current weather conditions
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature&timezone=auto`;
    const response = await fetch(url);
    const data = await response.json();
    const current = data.current;

    // 3. Map WMO Weather Codes to App UI types
    const weatherInfo = mapWeatherCode(current.weather_code);
    
    // 4. Update the Weather Bar UI
    renderWeatherBar(current, weatherInfo);
    
    // 5. Trigger the Dynamic Visual Effects (Rain, Storm, etc.)
    applyEnvironmentalEffects(weatherInfo.type);

  } catch (error) {
    console.error("Weather Error:", error);
    bar.innerHTML = `<div class="weather-error">📍 Location access required for Live Weather</div>`;
  }
}

/**
 * Translates WMO codes to simple descriptive types
 */
function mapWeatherCode(code) {
  if (code === 0) return { icon: '☀️', desc: 'Clear Skies', type: 'sunny' };
  if (code <= 3)  return { icon: '☁️', desc: 'Mostly Cloudy', type: 'cloudy' };
  if (code <= 48) return { icon: '🌫️', desc: 'Foggy Conditions', type: 'cloudy' };
  if (code <= 67) return { icon: '🌧️', desc: 'Rainy Weather', type: 'rainy' };
  if (code <= 77) return { icon: '❄️', desc: 'Snowy Weather', type: 'snowy' };
  if (code <= 82) return { icon: '🌦️', desc: 'Intermittent Showers', type: 'rainy' };
  if (code >= 95) return { icon: '⛈️', desc: 'Thunderstorm Warning', type: 'stormy' };
  return { icon: '🌤️', desc: 'Variable Conditions', type: 'cloudy' };
}

/**
 * Applies the visual theme based on current weather
 */
function applyEnvironmentalEffects(type) {
  const rain = document.getElementById('rainContainer');
  const snow = document.getElementById('snowContainer');
  const sun = document.getElementById('sunContainer');
  const lightning = document.getElementById('lightning');

  // Reset all active layers
  rain.classList.remove('active');
  snow.classList.remove('active');
  sun.classList.remove('active');

  if (type === 'rainy') {
    rain.classList.add('active');
    initRainEffect(40); // Soft drizzle
  } else if (type === 'stormy') {
    rain.classList.add('active');
    initRainEffect(100); // Heavy rain
    startThunderAnimation();
  } else if (type === 'sunny') {
    sun.classList.add('active');
  } else if (type === 'snowy') {
    snow.classList.add('active');
    // You can add a snow effect function here similar to rain
  }
}

/**
 * Generates dynamic raindrops
 */
function initRainEffect(density) {
  const container = document.getElementById('rainContainer');
  container.innerHTML = '';
  for (let i = 0; i < density; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (Math.random() * 0.4 + 0.4) + 's';
    drop.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(drop);
  }
}

/**
 * Triggers random screen flashes for lightning
 */
function startThunderAnimation() {
  const flashLayer = document.getElementById('lightning');
  setInterval(() => {
    if (Math.random() > 0.85) { // Random chance for realism
      flashLayer.classList.add('flash');
      setTimeout(() => flashLayer.classList.remove('flash'), 150);
    }
  }, 4000);
}

// Initialize Weather on Page Load
window.addEventListener('load', fetchWeather);

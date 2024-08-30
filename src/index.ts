import { fetchWeatherData, fetchTideData } from './api';
import { formatWeatherData } from './weather';
import { formatTideData } from './tide';
import { renderDashboard } from './ui';

async function updateDashboard() {
  try {
    const weatherData = await fetchWeatherData();
    const weatherHtml = formatWeatherData(weatherData);

    let tideHtml = localStorage.getItem('tideData');
    const lastTideFetch = localStorage.getItem('lastTideFetch');

    if (!tideHtml || !lastTideFetch || isNewDay(new Date(lastTideFetch))) {
      const tideData = await fetchTideData();
      tideHtml = formatTideData(tideData);
      localStorage.setItem('tideData', tideHtml);
      localStorage.setItem('lastTideFetch', new Date().toISOString());
    }

    renderDashboard(weatherHtml, tideHtml);
  } catch (error) {
    console.error('Error updating dashboard:', error);
  }
}

function isNewDay(lastFetch: Date): boolean {
  const now = new Date();
  return now.getDate() !== lastFetch.getDate() || now.getMonth() !== lastFetch.getMonth() || now.getFullYear() !== lastFetch.getFullYear();
}

// Initial update
updateDashboard();

// Update every 15 minutes
setInterval(updateDashboard, 15 * 60 * 1000);


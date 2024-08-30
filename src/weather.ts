import { WeatherData } from './types';

export function getWeatherIcon(iconCode: string): string {
  // Map OpenWeatherMap icon codes to simple CSS icons
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  };
  return iconMap[iconCode] || '❓';
}

export function formatWeatherData(data: WeatherData): string {
  const current = `${getWeatherIcon(data.current.weather[0].icon)} ${Math.round(data.current.temp)}°F
${data.current.weather[0].description}`;

  const forecast = data.forecast.map(item => `
${getWeatherIcon(item.weather[0].icon)} ${Math.round(item.temp)}°F
${new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric' })}`).join('');

  return `${current}

${forecast}`;
}

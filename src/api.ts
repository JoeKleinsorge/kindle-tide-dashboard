import axios from 'axios';
import { WeatherData, TideData } from './types';

const WEATHER_API_KEY = ''
const TIDE_API_KEY = ''

export async function fetchWeatherData(): Promise<WeatherData> {
  const currentResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=palm coast&appid=${WEATHER_API_KEY}&lang=en&units=imperial`);
  const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=palm coast&appid=${WEATHER_API_KEY}&lang=en&units=imperial`);
  
  return {
    current: {
      temp: currentResponse.data.main.temp,
      weather: currentResponse.data.weather,
    },
    forecast: forecastResponse.data.list.slice(0, 4).map((item: any) => ({
      dt: item.dt,
      temp: item.main.temp,
      weather: item.weather,
    })),
  };
}

export async function fetchTideData(): Promise<TideData> {
  const now = new Date();
  const end = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  const response = await axios.get(`https://api.stormglass.io/v2/tide/extremes/point`, {
    params: {
      lat: 29.65,
      lng: -81.20,
      start: now.toISOString(),
      end: end.toISOString(),
    },
    headers: {
      'Authorization': TIDE_API_KEY,
    },
  });
  return response.data;
}


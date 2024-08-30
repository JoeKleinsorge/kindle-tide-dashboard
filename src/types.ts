export interface WeatherData {
  current: {
    temp: number;
    weather: { description: string; icon: string }[];
  };
  forecast: {
    dt: number;
    temp: number;
    weather: { description: string; icon: string }[];
  }[];
}

export interface TideData {
  data: {
    height: number;
    time: string;
    type: 'high' | 'low';
  }[];
}

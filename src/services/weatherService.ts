const API_KEY = '4a36867b091c4b4fbc921945252407';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  tz_id: string;
  localtime: string;
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  is_day: number;
}

export interface WeatherForecastHour {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
}

export interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast?: {
    forecastday: Array<{
      hour: WeatherForecastHour[];
    }>;
  };
}

export const searchLocations = async (query: string) => {
  if (!API_KEY) {
    throw new Error('Weather API key not found. Please set VITE_WEATHER_API_KEY environment variable.');
  }

  const response = await fetch(
    `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  return response.json();
};

export const getCurrentWeather = async (location: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('Weather API key not found. Please set VITE_WEATHER_API_KEY environment variable.');
  }

  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Weather fetch failed: ${response.statusText}`);
  }

  return response.json();
};

export const getWeatherForecast = async (location: string, days: number = 1): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error('Weather API key not found. Please set VITE_WEATHER_API_KEY environment variable.');
  }

  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=${days}&aqi=no&alerts=no`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Forecast fetch failed: ${response.statusText}`);
  }

  return response.json();
};

export const formatLocalTime = (localtime: string, timezone: string): string => {
  try {
    const date = new Date(localtime);
    return date.toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return localtime;
  }
};
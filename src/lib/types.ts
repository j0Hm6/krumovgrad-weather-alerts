
export interface WeatherData {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    last_updated: string;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
  };
  hour: HourForecast[];
}

export interface HourForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  chance_of_rain: number;
  chance_of_snow: number;
}

export interface AlertConfig {
  email: string;
  frequency: "daily" | "weekly";
  conditions: string[];
  phoneNumber?: string;
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Thermometer, Wind } from "lucide-react";
import { WeatherData } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

interface CurrentWeatherProps {
  weatherData: WeatherData;
  isLoading: boolean;
}

export function CurrentWeather({ weatherData, isLoading }: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <Card className="col-span-12 lg:col-span-8 h-[300px] animate-pulse bg-gray-200">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-gray-400">Loading current weather...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!weatherData) {
    return (
      <Card className="col-span-12 lg:col-span-8">
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-gray-500">No weather data available</p>
        </CardContent>
      </Card>
    );
  }

  const { current, location } = weatherData;
  const condition = current.condition.text.toLowerCase();
  
  let bgClass = "weather-gradient";
  if (condition.includes("sun") || condition.includes("clear")) {
    bgClass = "weather-bg-sunny";
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    bgClass = "weather-bg-rainy";
  } else if (condition.includes("snow") || condition.includes("ice")) {
    bgClass = "weather-bg-snowy";
  } else if (condition.includes("cloud") || condition.includes("overcast")) {
    bgClass = "weather-bg-cloudy";
  }

  return (
    <Card className={`col-span-12 lg:col-span-8 overflow-hidden ${bgClass}`}>
      <CardHeader className="bg-black/10">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white text-2xl">
              {location.name}, {location.country}
            </CardTitle>
            <CardDescription className="text-white/70">
              {current.last_updated}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src={current.condition.icon.replace('//cdn.weatherapi.com', 'https://cdn.weatherapi.com')} 
              alt={current.condition.text}
              className="w-16 h-16"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-6xl font-bold text-white mb-2">{current.temp_c}°C</h2>
            <p className="text-xl text-white/80 font-medium">{current.condition.text}</p>
            <p className="text-white/60">Feels like {current.feelslike_c}°C</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="h-5 w-5 text-white" />
                <span className="text-white font-medium">Wind</span>
              </div>
              <p className="text-2xl font-semibold text-white">{current.wind_kph} km/h</p>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-white" />
                <span className="text-white font-medium">Humidity</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold text-white">{current.humidity}%</p>
                <Progress value={current.humidity} className="h-2 w-24" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

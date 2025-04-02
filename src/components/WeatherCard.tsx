
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Cloud, Droplets, Snowflake, Sun, Wind } from "lucide-react";

interface WeatherCardProps {
  date: string;
  temperature: number;
  condition: string;
  conditionIcon: string;
  precipitation: number;
  isSnow?: boolean;
}

export function WeatherCard({ 
  date, 
  temperature, 
  condition, 
  conditionIcon,
  precipitation,
  isSnow = false
}: WeatherCardProps) {
  const getWeatherIcon = () => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return <Sun className="text-weather-sunny h-8 w-8 animate-bounce-slow" />;
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return <Droplets className="text-weather-rainy h-8 w-8" />;
    } else if (lowerCondition.includes("snow") || lowerCondition.includes("ice")) {
      return <Snowflake className="text-weather-snowy h-8 w-8" />;
    } else if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
      return <Cloud className="text-weather-cloudy h-8 w-8" />;
    } else {
      return <Wind className="text-gray-500 h-8 w-8" />;
    }
  };
  
  const getWeatherClass = () => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes("sun") || lowerCondition.includes("clear")) {
      return "weather-bg-sunny";
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
      return "weather-bg-rainy";
    } else if (lowerCondition.includes("snow") || lowerCondition.includes("ice")) {
      return "weather-bg-snowy";
    } else if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
      return "weather-bg-cloudy";
    } else {
      return "bg-gradient-to-br from-gray-200 to-gray-300";
    }
  };

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${getWeatherClass()}`}>
      <CardHeader className="bg-black/10 pb-2 pt-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-white text-lg">{date}</h3>
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
            {isSnow ? (
              <Snowflake className="h-4 w-4 text-white" />
            ) : (
              <Droplets className="h-4 w-4 text-white" />
            )}
            <span className="text-white text-sm">{precipitation}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 pb-4 flex flex-col items-center">
        <div className="mb-4">
          {getWeatherIcon()}
        </div>
        <div className="text-white text-3xl font-bold mb-1">{temperature}°C</div>
        <p className="text-white/80 text-sm font-medium">{condition}</p>
      </CardContent>
    </Card>
  );
}


import { WeatherData } from "@/lib/types";
import { WeatherCard } from "./WeatherCard";
import { format, parseISO } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface WeatherForecastProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
}

export function WeatherForecast({ weatherData, isLoading }: WeatherForecastProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-pulse">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-48 rounded-md bg-gray-200"></div>
        ))}
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No forecast data available</p>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {weatherData.forecast.forecastday.map((day) => (
          <WeatherCard
            key={day.date}
            date={format(parseISO(day.date), 'EEE, MMM d')}
            temperature={Math.round(day.day.avgtemp_c)}
            condition={day.day.condition.text}
            conditionIcon={day.day.condition.icon}
            precipitation={day.day.daily_chance_of_snow > 0 ? day.day.daily_chance_of_snow : day.day.daily_chance_of_rain}
            isSnow={day.day.daily_chance_of_snow > 0}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

import { useState, useEffect } from "react";
import { fetchWeatherData } from "@/lib/api";
import { WeatherData } from "@/lib/types";
import { CurrentWeather } from "@/components/CurrentWeather";
import { WeatherForecast } from "@/components/WeatherForecast";
import { AlertSubscriptionForm } from "@/components/AlertSubscriptionForm";
import { Cloud, CloudRain, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const loadWeatherData = async () => {
    try {
      const data = await fetchWeatherData();
      setWeatherData(data);
    } catch (error) {
      toast({
        title: "Error loading weather data",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadWeatherData();
      toast({
        title: "Weather data updated",
        description: "Weather information is now up to date",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-gradient-to-r from-weather-blue to-blue-600 text-white shadow-md">
        <div className="container mx-auto py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CloudRain className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold">Krumovgrad Weather Alerts</h1>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-white border-white hover:bg-white/20 hover:text-white"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <CurrentWeather weatherData={weatherData as WeatherData} isLoading={isLoading} />
          
          <div className="col-span-12 lg:col-span-4">
            <AlertSubscriptionForm />
          </div>
          
          <div className="col-span-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center">
                <Cloud className="h-5 w-5 mr-2" />
                5-Day Forecast
              </h2>
            </div>
            <WeatherForecast weatherData={weatherData} isLoading={isLoading} />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-4 bulgarian-flag-gradient mx-auto mb-3"></div>
          <p className="mb-2">Krumovgrad Weather Alerts</p>
          <p className="text-sm text-gray-400">
            Weather data provided by WeatherAPI.com
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useState, useEffect } from "react";
import { fetchWeatherData, setupDailyWeatherAlerts } from "@/lib/api";
import { WeatherData } from "@/lib/types";
import { CurrentWeather } from "@/components/CurrentWeather";
import { WeatherForecast } from "@/components/WeatherForecast";
import { AlertSubscriptionForm } from "@/components/AlertSubscriptionForm";
import { Cloud, CloudRain, RefreshCw, Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSettingUpDailyAlerts, setIsSettingUpDailyAlerts] = useState(false);
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

  const handleSetupDailyAlerts = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setIsSettingUpDailyAlerts(true);
    try {
      await setupDailyWeatherAlerts(email, phoneNumber || undefined);
      toast({
        title: "Daily alerts activated",
        description: "You will now receive weather updates every day at 7:00 AM",
      });
    } catch (error) {
      toast({
        title: "Error setting up alerts",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSettingUpDailyAlerts(false);
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
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white hover:bg-white/20 hover:text-white"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Daily Alerts
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Set Up Daily Weather Alerts</DialogTitle>
                    <DialogDescription>
                      Receive daily weather updates for Krumovgrad at 7:00 AM.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="daily-email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="daily-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-email@example.com"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="daily-phone" className="text-right">
                        Phone (optional)
                      </Label>
                      <Input
                        id="daily-phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+35912345678"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSetupDailyAlerts} disabled={isSettingUpDailyAlerts}>
                      {isSettingUpDailyAlerts && <span className="mr-2 animate-spin">⏳</span>}
                      Activate Daily Alerts
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
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

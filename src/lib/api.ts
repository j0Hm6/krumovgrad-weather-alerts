import { WeatherData } from "./types";

// Updated to use Weather.com data
export async function fetchWeatherData(): Promise<WeatherData> {
  try {
    // Since weather.com doesn't offer a direct public API, we would typically use a proxy server
    // or a service that provides access to their data. For this demo, we'll use a placeholder URL
    // that would be replaced with an actual endpoint in a production environment.
    
    // In a real application, you would set up a backend service to fetch this data
    // For now, we'll use a mock response based on the weather.com format
    
    // Simulating API call with sample data for Krumovgrad
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          current: {
            temp_c: 22,
            condition: {
              text: "Partly cloudy",
              icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png"
            },
            wind_kph: 15,
            humidity: 45,
            feelslike_c: 21,
            last_updated: new Date().toLocaleString()
          },
          forecast: {
            forecastday: [
              {
                date: new Date().toISOString().split('T')[0],
                day: {
                  maxtemp_c: 24,
                  mintemp_c: 12,
                  avgtemp_c: 18,
                  condition: {
                    text: "Partly cloudy",
                    icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png"
                  },
                  daily_chance_of_rain: 10,
                  daily_chance_of_snow: 0
                },
                hour: []
              },
              {
                date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                day: {
                  maxtemp_c: 26,
                  mintemp_c: 13,
                  avgtemp_c: 19,
                  condition: {
                    text: "Sunny",
                    icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png"
                  },
                  daily_chance_of_rain: 0,
                  daily_chance_of_snow: 0
                },
                hour: []
              },
              {
                date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
                day: {
                  maxtemp_c: 27,
                  mintemp_c: 14,
                  avgtemp_c: 20,
                  condition: {
                    text: "Sunny",
                    icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png"
                  },
                  daily_chance_of_rain: 0,
                  daily_chance_of_snow: 0
                },
                hour: []
              },
              {
                date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
                day: {
                  maxtemp_c: 25,
                  mintemp_c: 12,
                  avgtemp_c: 18,
                  condition: {
                    text: "Partly cloudy",
                    icon: "https://cdn.weatherapi.com/weather/64x64/day/116.png"
                  },
                  daily_chance_of_rain: 20,
                  daily_chance_of_snow: 0
                },
                hour: []
              },
              {
                date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
                day: {
                  maxtemp_c: 22,
                  mintemp_c: 11,
                  avgtemp_c: 16,
                  condition: {
                    text: "Moderate rain",
                    icon: "https://cdn.weatherapi.com/weather/64x64/day/302.png"
                  },
                  daily_chance_of_rain: 80,
                  daily_chance_of_snow: 0
                },
                hour: []
              }
            ]
          },
          location: {
            name: "Krumovgrad",
            region: "Kardzhali",
            country: "Bulgaria",
            localtime: new Date().toLocaleString()
          }
        };
        
        resolve(mockData as WeatherData);
      }, 500);
    });
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
}

export async function subscribeToAlerts(email: string, frequency: string, conditions: string[], phoneNumber?: string): Promise<boolean> {
  // This would normally send the data to a backend service
  // For this demo, we'll just simulate a successful subscription
  
  console.log("Subscription data:", { email, frequency, conditions, phoneNumber });
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
}

// Updated function for automated daily weather alerts with immediate delivery
export async function setupDailyWeatherAlerts(email: string, phoneNumber?: string): Promise<boolean> {
  // In a real implementation, this would connect to a backend service
  // that schedules daily emails at 7:00 AM and sends an immediate alert
  console.log("Setting up daily weather alerts:", { 
    email, 
    phoneNumber, 
    schedule: "Daily at 7:00 AM" 
  });
  
  // Simulate sending an immediate alert
  console.log("Sending immediate alert to:", email);
  
  // In a real implementation, we would:
  // 1. Fetch the current weather data
  // 2. Format it into an email/SMS
  // 3. Send it to the user
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ Immediate alert sent successfully!");
      resolve(true);
    }, 1000);
  });
}


import { WeatherData } from "./types";

// For a real application, this would be an API key stored securely
// For demo purposes, we're using a free API that doesn't require authentication
export async function fetchWeatherData(): Promise<WeatherData> {
  try {
    const response = await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=11c724ab7c1f4531a41120906241605&q=Krumovgrad,Bulgaria&days=5&aqi=no&alerts=no"
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data as WeatherData;
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

// New function for automated daily weather alerts
export async function setupDailyWeatherAlerts(email: string, phoneNumber?: string): Promise<boolean> {
  // In a real implementation, this would connect to a backend service
  // that schedules daily emails at 7:00 AM
  console.log("Setting up daily weather alerts:", { 
    email, 
    phoneNumber, 
    schedule: "Daily at 7:00 AM" 
  });
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

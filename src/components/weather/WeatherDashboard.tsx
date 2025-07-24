import { useState } from "react";
import { WeatherSearch } from "./WeatherSearch";
import { WeatherDisplay } from "./WeatherDisplay";
import { WeatherChart } from "./WeatherChart";
import { WeatherBackground } from "./WeatherBackground";
import { Button } from "@/components/ui/button";
import { Thermometer, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCurrentWeather, getWeatherForecast, type WeatherData } from "@/services/weatherService";

export const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const { toast } = useToast();

  const handleLocationSearch = async (location: string) => {
    setIsLoading(true);
    
    try {
      // Fetch current weather and forecast data
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(location),
        getWeatherForecast(location, 1)
      ]);
      
      setWeatherData(currentData);
      
      // Extract hourly data for the next 24 hours
      if (forecastData.forecast?.forecastday[0]?.hour) {
        const now = new Date();
        const currentHour = now.getHours();
        const todayHours = forecastData.forecast.forecastday[0].hour.slice(currentHour);
        setHourlyData(todayHours);
      }
      
      toast({
        title: "Weather Updated",
        description: `Showing weather for ${currentData.location.name}`,
      });
      
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "C" ? "F" : "C");
  };

  return (
    <WeatherBackground 
      condition={weatherData?.current?.condition?.text} 
      isDay={weatherData?.current?.is_day}
    >
      <div className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in">
            <div className="flex items-center space-x-3">
              <Thermometer className="w-8 h-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">WeatherApp</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleUnit}
                className="glass-card border-0 text-foreground hover:bg-glass smooth-transition"
              >
                °{unit}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="glass-card border-0 text-foreground hover:bg-glass smooth-transition"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Search Section */}
          <section className="flex justify-center">
            <WeatherSearch 
              onLocationSelect={handleLocationSearch}
              isLoading={isLoading}
            />
          </section>

          {/* Weather Display */}
          {weatherData && !isLoading && (
            <section className="animate-fade-in">
              <WeatherDisplay data={weatherData} unit={unit} />
            </section>
          )}

          {/* Loading State */}
          {isLoading && (
            <section className="flex justify-center">
              <div className="glass-card p-8 text-center">
                <div className="loading-pulse space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto"></div>
                  <div className="h-8 bg-muted rounded w-32 mx-auto"></div>
                  <div className="h-4 bg-muted rounded w-48 mx-auto"></div>
                </div>
                <p className="mt-4 text-muted-foreground">Fetching weather data...</p>
              </div>
            </section>
          )}

        </div>
      </div>
    </WeatherBackground>
  );
};
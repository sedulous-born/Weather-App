import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Thermometer, Gauge, CloudSnow, Compass, Zap } from "lucide-react";
import { formatLocalTime, type WeatherData } from "@/services/weatherService";

interface WeatherDisplayProps {
  data: WeatherData;
  unit?: "C" | "F";
}

export const WeatherDisplay = ({ data, unit = "C" }: WeatherDisplayProps) => {
  const temperature = unit === "C" ? data.current.temp_c : data.current.temp_f;
  const feelsLike = unit === "C" ? data.current.feelslike_c : data.current.feelslike_f;
  const windSpeed = unit === "C" ? data.current.wind_kph : data.current.wind_mph;
  const windUnit = unit === "C" ? "km/h" : "mph";
  const visibility = unit === "C" ? data.current.vis_km : data.current.vis_miles;
  const visUnit = unit === "C" ? "km" : "miles";
  const pressure = unit === "C" ? data.current.pressure_mb : data.current.pressure_in;
  const pressureUnit = unit === "C" ? "mb" : "in";
  const dewpoint = unit === "C" ? data.current.dewpoint_c : data.current.dewpoint_f;
  const gustSpeed = unit === "C" ? data.current.gust_kph : data.current.gust_mph;
  const heatIndex = unit === "C" ? data.current.heatindex_c : data.current.heatindex_f;
  const windChill = unit === "C" ? data.current.windchill_c : data.current.windchill_f;

  const formattedLocalTime = formatLocalTime(data.location.localtime, data.location.tz_id);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-scale-in">
      {/* Main Weather Card */}
      <div className="glass-card p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Weather Icon */}
          <div className="flex items-center justify-center mb-2">
            <img 
              src={`https:${data.current.condition.icon}`} 
              alt={data.current.condition.text}
              className="w-20 h-20"
            />
          </div>
          
          {/* Location and Time */}
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">
              {data.location.name}
              {data.location.region && `, ${data.location.region}`}
            </h1>
            <p className="text-sm text-muted-foreground">{data.location.country}</p>
            <p className="text-xs text-muted-foreground">{formattedLocalTime}</p>
          </div>
          
          {/* Temperature Display */}
          <div className="flex items-baseline space-x-2">
            <span className="temp-display text-foreground">
              {Math.round(temperature)}
            </span>
            <span className="temp-unit text-muted-foreground">
              °{unit}
            </span>
          </div>
          
          <p className="text-xl text-muted-foreground font-medium">
            {data.current.condition.text}
          </p>
          
          <p className="text-sm text-muted-foreground">
            Feels like {Math.round(feelsLike)}°{unit}
          </p>
        </div>
      </div>

      {/* Primary Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center space-y-2">
          <Wind className="w-6 h-6 text-primary mx-auto" />
          <div>
            <p className="text-lg font-bold text-foreground">{Math.round(windSpeed)}</p>
            <p className="text-xs text-muted-foreground">{windUnit}</p>
            <p className="text-xs text-muted-foreground">Wind</p>
          </div>
        </div>

        <div className="glass-card p-4 text-center space-y-2">
          <Droplets className="w-6 h-6 text-primary mx-auto" />
          <div>
            <p className="text-lg font-bold text-foreground">{data.current.humidity}%</p>
            <p className="text-xs text-muted-foreground">Humidity</p>
          </div>
        </div>

        <div className="glass-card p-4 text-center space-y-2">
          <Eye className="w-6 h-6 text-primary mx-auto" />
          <div>
            <p className="text-lg font-bold text-foreground">{visibility}</p>
            <p className="text-xs text-muted-foreground">{visUnit}</p>
            <p className="text-xs text-muted-foreground">Visibility</p>
          </div>
        </div>

        <div className="glass-card p-4 text-center space-y-2">
          <Gauge className="w-6 h-6 text-primary mx-auto" />
          <div>
            <p className="text-lg font-bold text-foreground">{Math.round(pressure)}</p>
            <p className="text-xs text-muted-foreground">{pressureUnit}</p>
            <p className="text-xs text-muted-foreground">Pressure</p>
          </div>
        </div>
      </div>

      {/* Extended Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="glass-card p-3 text-center space-y-1">
          <Compass className="w-5 h-5 text-primary mx-auto" />
          <div>
            <p className="text-sm font-semibold text-foreground">{data.current.wind_dir}</p>
            <p className="text-xs text-muted-foreground">{data.current.wind_degree}°</p>
            <p className="text-xs text-muted-foreground">Wind Dir</p>
          </div>
        </div>

        <div className="glass-card p-3 text-center space-y-1">
          <Wind className="w-5 h-5 text-primary mx-auto" />
          <div>
            <p className="text-sm font-semibold text-foreground">{Math.round(gustSpeed)}</p>
            <p className="text-xs text-muted-foreground">{windUnit}</p>
            <p className="text-xs text-muted-foreground">Gusts</p>
          </div>
        </div>

        <div className="glass-card p-3 text-center space-y-1">
          <Cloud className="w-5 h-5 text-primary mx-auto" />
          <div>
            <p className="text-sm font-semibold text-foreground">{data.current.cloud}%</p>
            <p className="text-xs text-muted-foreground">Cloud Cover</p>
          </div>
        </div>

        <div className="glass-card p-3 text-center space-y-1">
          <Zap className="w-5 h-5 text-primary mx-auto" />
          <div>
            <p className="text-sm font-semibold text-foreground">{data.current.uv}</p>
            <p className="text-xs text-muted-foreground">UV Index</p>
          </div>
        </div>

        <div className="glass-card p-3 text-center space-y-1">
          <Droplets className="w-5 h-5 text-primary mx-auto" />
          <div>
            <p className="text-sm font-semibold text-foreground">{Math.round(dewpoint)}°</p>
            <p className="text-xs text-muted-foreground">Dew Point</p>
          </div>
        </div>

        <div className="glass-card p-3 text-center space-y-1">
          {data.current.is_day ? (
            <Thermometer className="w-5 h-5 text-primary mx-auto" />
          ) : (
            <CloudSnow className="w-5 h-5 text-primary mx-auto" />
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {Math.round(data.current.is_day ? heatIndex : windChill)}°
            </p>
            <p className="text-xs text-muted-foreground">
              {data.current.is_day ? "Heat Index" : "Wind Chill"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
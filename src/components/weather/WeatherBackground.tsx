import { useEffect, useState } from "react";
import clearDayImg from "@/assets/clear-day.jpg";
import rainyDayImg from "@/assets/rainy-day.jpg";
import cloudyDayImg from "@/assets/cloudy-day.jpg";

interface WeatherBackgroundProps {
  condition?: string;
  isDay?: number;
  children: React.ReactNode;
}

export const WeatherBackground = ({ condition, isDay = 1, children }: WeatherBackgroundProps) => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");

  useEffect(() => {
    if (!condition) {
      setBackgroundImage(clearDayImg);
      return;
    }

    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle") || lowerCondition.includes("storm")) {
      setBackgroundImage(rainyDayImg);
    } else if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast") || lowerCondition.includes("mist")) {
      setBackgroundImage(cloudyDayImg);
    } else {
      setBackgroundImage(clearDayImg);
    }
  }, [condition]);

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
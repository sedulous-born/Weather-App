import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WeatherSearchProps {
  onLocationSelect: (location: string) => void;
  isLoading?: boolean;
}

export const WeatherSearch = ({ onLocationSelect, isLoading }: WeatherSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect(query.trim());
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSelect(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:bg-background/80 smooth-transition"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex gap-3">
          <Button 
            type="submit" 
            className="flex-1 smooth-transition"
            disabled={!query.trim() || isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleCurrentLocation}
            className="bg-background/50 border-border/50 hover:bg-background/80 smooth-transition"
            disabled={isLoading}
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
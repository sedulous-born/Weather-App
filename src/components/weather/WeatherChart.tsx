import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HourlyForecast {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon?: string;
  };
  humidity?: number;
  wind_mph?: number;
  wind_kph?: number;
}

interface WeatherChartProps {
  hourlyData: HourlyForecast[];
  unit?: "C" | "F";
}

export const WeatherChart = ({ hourlyData, unit = "C" }: WeatherChartProps) => {
  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
          <p className="text-sm text-muted-foreground">Loading 24-hour forecast...</p>
        </div>
      </div>
    );
  }

  const labels = hourlyData.slice(0, 24).map((hour) => {
    const time = new Date(hour.time);
    return time.getHours().toString().padStart(2, '0') + ':00';
  });

  const temperatures = hourlyData.slice(0, 24).map((hour) => 
    unit === "C" ? hour.temp_c : hour.temp_f
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Temperature (°${unit})`,
        data: temperatures,
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'hsl(var(--primary))',
        pointBorderColor: 'hsl(var(--primary-foreground))',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '24-Hour Temperature Forecast',
        font: {
          size: 18,
          weight: 600,
        },
        color: 'hsl(var(--foreground))',
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y}°${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(var(--border) / 0.5)',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'hsl(var(--border) / 0.5)',
          drawBorder: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return `${value}°`;
          },
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: 'hsl(var(--primary))',
        hoverBorderColor: 'hsl(var(--primary-foreground))',
      },
    },
  };

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
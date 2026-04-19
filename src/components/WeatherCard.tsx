import { motion } from "motion/react";

interface WeatherDescription {
  description: string;
  icon: string;
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
}

interface WindData {
  speed: number;
}

interface WeatherData {
  name: string;
  weather: WeatherDescription[];
  main: MainWeatherData;
  wind: WindData;
}

interface WeatherCardProps {
  data: WeatherData;
}
{
}
const WeatherCard = ({ data }: WeatherCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#1E293B] rounded-xl  p-6 border-[#4FCED5] border-2  scale-100 w-full max-w-2xl mx-auto text-white"
    >
      <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
      <p className="text-sm text-gray-300 mb-4 capitalize">
        {data.weather[0].description}
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-bold text-[#4FCED5]">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="text-sm text-gray-400">
            Feels like {Math.round(data.main.feels_like)}°C
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="w-20 h-20"
        />
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-300">
        <p>
          💧 Humidity: <span className="text-white">{data.main.humidity}%</span>
        </p>
        <p>
          🌬 Wind: <span className="text-white">{data.wind.speed} m/s</span>
        </p>
      </div>
    </motion.div>
  );
};

export default WeatherCard;

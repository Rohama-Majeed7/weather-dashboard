import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import HourlyForecast from "./components/HourlyForecast";

const API_KEY = "3fa9c7b751dcab8546144d36558c250d";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  const fetchWeatherData = async () => {
    if (!city) return;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    console.log("weather response:", res);

    const data = await res.json();
    console.log("weather data:", data);

    if (data.cod !== 200) {
      alert(data.message);
      setWeatherData(null);
      setForecastData([]);
      setHourlyData([]);
      return;
    }

    setWeatherData(data);

    const { lat, lon } = data.coord;

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const forecast = await forecastRes.json();
    console.log("weather forecast data:", forecast);

    // 5-day at 12:00 PM
    const daily = forecast.list.filter((item: any) =>
      item.dt_txt.includes("12:00:00")
    );
    console.log("daily forecast:", daily);

    // Next 8 intervals (~24 hours)
    const hourly = forecast.list.slice(0, 8);
    console.log("hourly forecast:", hourly);

    setForecastData(daily);
    setHourlyData(hourly);
  };
  useEffect(() => {
    console.log("componnet mount");
  }, [city]);
  return (
    <div className="min-h-screen text-white w-[98vw] max-w-[1050px] mx-auto  bg-gray-900 shadow  shadow-[#4FCED5] p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-accent mb-6">Weather Dashboard</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="px-4 py-2 border-2  border-[#4FCED5] rounded bg-card text-white placeholder:text-soft w-64"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-[#4FCED5] hover:bg-transparent hover:border-[#4FCED5] hover:border-2 hover:text-white  cursor-pointer text-primary px-4 py-2 rounded font-semibold"
          onClick={fetchWeatherData}
        >
          Get Weather
        </button>
      </div>

      {weatherData && <WeatherCard data={weatherData} />}
      {hourlyData.length > 0 && <HourlyForecast data={hourlyData} />}
      {forecastData.length > 0 && <ForecastCard data={forecastData} />}
    </div>
  );
};

export default App;

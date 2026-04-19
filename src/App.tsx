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
const [showModal, setShowModal] = useState(false);
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
    setShowModal(true);
  };
  useEffect(() => {
    console.log("componnet mount");
  }, [city]);
  return (
  <>
    {/* 🏠 MAIN PAGE */}
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-center px-4">

      {/* 🌤 HERO */}
      <div className="text-center max-w-2xl">

        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#4FCED5]/10 flex items-center justify-center shadow-lg shadow-[#4FCED5]/20">
          <span className="text-4xl">🌦</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#4FCED5] drop-shadow-md">
          Weather Dashboard
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
          Search any city and get real-time weather, hourly updates, and 5-day forecasts instantly.
        </p>
      </div>

      {/* 🔍 SEARCH CARD */}
      <div className="mt-10 w-full max-w-md bg-gray-900/40 border border-gray-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">

        <input
          type="text"
          className="w-full px-4 py-3 rounded-xl bg-gray-800/70 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4FCED5] transition"
          placeholder="Enter city name (e.g. Taxila)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="w-full mt-4 px-5 py-3 rounded-xl bg-[#4FCED5] text-black font-semibold hover:bg-transparent hover:text-[#4FCED5] border border-transparent hover:border-[#4FCED5] transition-all duration-300 shadow-md"
          onClick={fetchWeatherData}
        >
          Search Weather
        </button>
      </div>

      {/* 🌍 HINT */}
      <p className="text-gray-600 text-xs mt-6">
        Try: Islamabad • London • New York • Dubai
      </p>
    </div>

    {/* 🌤 MODAL */}
  {showModal && weatherData && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 p-4">

    {/* 🌤 MODAL CARD */}
    <div className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-gray-800 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">

      {/* 🌈 TOP HEADER */}
      <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between bg-gray-900/40 backdrop-blur-md">

        <div>
          <h2 className="text-xl font-bold text-[#4FCED5]">
            {weatherData.name}
          </h2>
          <p className="text-xs text-gray-400">
            Live weather insights
          </p>
        </div>

        {/* ❌ Close */}
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-800 hover:bg-gray-700 transition w-9 h-9 rounded-full flex items-center justify-center text-white"
        >
          ✕
        </button>

      </div>

      {/* 📊 CONTENT */}
      <div className="flex-1 overflow-y-auto weather-scrollbar p-5 space-y-5">

        {/* 🌤 Current Weather */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-2xl py-6  transition">
          <WeatherCard data={weatherData} />
        </div>

        {/* ⏱ Hourly */}
        {hourlyData.length > 0 && (
          <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-4  transition">
            <HourlyForecast data={hourlyData} />
          </div>
        )}

        {/* 📅 Forecast */}
        {forecastData.length > 0 && (
          <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-4  transition">
            <ForecastCard data={forecastData} />
          </div>
        )}

      </div>

      {/* 📱 MOBILE HINT */}
      <div className="sm:hidden text-center text-xs text-gray-500 py-2 border-t border-gray-800">
        Swipe down or tap ✕ to close
      </div>

    </div>
  </div>
)}
  </>
);
};

export default App;

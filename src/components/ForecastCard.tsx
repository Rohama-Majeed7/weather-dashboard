import { motion } from "motion/react";

interface weatherDes {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface weatherMain {
  temp: number;
}
interface dailyForecastData {
  dt_txt: Date;
  weather: weatherDes[];
  main: weatherMain;
}
const ForecastCard = ({ data }: { data: dailyForecastData[] }) => {
  return (
    <div className="w-full ">
      <h2 className="text-xl font-bold  text-[#4FCED5] my-3">Next 5 Days</h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] justify-center w-full gap-2 mx-auto">
        {data.map((forecast, idx) => {
          const date = new Date(forecast.dt_txt).toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          return (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              key={idx}
              className="bg-[#273549] transition-all hover:shadow-[#4FCED5] shadow-md rounded-lg p-4 text-center "
            >
              <h3 className="text-lg font-semibold text-[#4FCED5]">{date}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt="icon"
                className="mx-auto w-14 h-14"
              />
              <p className="text-white">{Math.round(forecast.main.temp)}°C</p>
              <p className="text-gray-400 text-sm">
                {forecast.weather[0].main}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;

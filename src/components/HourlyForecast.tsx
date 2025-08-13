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
interface hourlyForecastData {
  dt_txt: Date;
  weather:weatherDes[];
  main:weatherMain
}
const HourlyForecast = ({ data }: { data: hourlyForecastData[] }) => {
  return (
    <div className="mt-6 w-full mx-auto">
      <h2 className="text-xl font-bold  text-[#4FCED5] ">Next 24 Hours</h2>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#4FCED5]/70 scrollbar-track-gray-300">
        <div className="flex gap-4 justify-between my-3">
          {data.map((item, index) => {
            const time = new Date(item.dt_txt).toLocaleTimeString(undefined, {
              hour: "numeric",
              hour12: true,
            });

            return (
              <motion.div
               initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
                key={index}
                className="bg-[#1E293B] hover:shadow-[#4FCED5] transition-all rounded-lg p-4 min-w-[100px] text-center text-white shadow-md"
              >
                <p className="text-sm text-[#4FCED5]">{time}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="icon"
                  className="mx-auto w-10 h-10"
                />
                <p className="font-semibold">{Math.round(item.main.temp)}°C</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;

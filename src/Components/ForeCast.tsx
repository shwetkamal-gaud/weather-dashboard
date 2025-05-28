import { useWeatherContext } from '../context/WeatherContext';
import { useForecast } from '../hooks/useForecast';
import { motion } from "framer-motion";

const ForeCast = () => {
    const { city } = useWeatherContext();
    const { data, isLoading, error } = useForecast(city);

    if (isLoading) return <p>Loading forecast...</p>;
    if (error) return <p>Error loading forecast.</p>
    const dailyData = data.list.filter((reading: any) => reading.dt_txt.includes("12:00:00"));
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6 dark:bg-black/20 bg-zinc-300/20 rounded-2xl backdrop-blur-[32px] p-6">
            {dailyData.map((day: any, idx: number) => (
                <div key={idx} className="p-4 bg-white/20 backdrop-blur-md rounded shadow text-center">
                    <h3 className="font-bold"> {new Date(day.dt_txt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}</h3>
                    <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description}
                        className="mx-auto"
                    />
                    <p>{day.weather[0].main}</p>
                    <p>{Math.round(day.main.temp)}°C</p>
                </div>
            ))}
        </motion.div>
    )
}

export default ForeCast
import { motion } from "framer-motion";
import { useWeather } from "../hooks/useWeather";

export const WeatherDisplay = () => {
    const { data } = useWeather();
    if (!data) return null;
    console.log(data)
    return (
        <motion.div
            className=""
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="dark:bg-black/20 bg-zinc-300/20 rounded-2xl backdrop-blur-[32px] p-6 flex-col justify-center items-center gap-4 flex">
                <div className="self-stretch justify-between items-center inline-flex">
                    <div className="justify-center items-center gap-2 inline-flex">
                        <div className="w-8 h-8 relative">
                            <img
                                className="mx-auto"
                                src={`https://openweathermap.org/img/wn/${data.weather.weather[0].icon}@2x.png`}
                                alt="icon"
                            />
                        </div>
                        <div className="text-black text-xl font-medium font-Outfit leading-7">
                            {data.weather.name}
                        </div>
                    </div>
                    <div className="text-black text-2xl font-semibold font-Outfit">
                        {Math.round(data.weather.main.temp ?? 0)}°
                    </div>
                </div>

                <div className="self-stretch grid grid-cols-3 gap-4">
                    <div className="px-4 py-3 bg-white/20 backdrop-blur-md rounded flex-col justify-center items-center gap-1 flex">
                        <div className="text-black text-sm font-medium">
                            Humidity
                        </div>
                        <div className="text-black text-xl font-semibold">
                            {data.weather.main.humidity}%
                        </div>
                    </div>

                    <div className="px-4 py-3 rounded backdrop-blur-md bg-white/20 flex-col justify-center items-center gap-1 flex">
                        <div className="text-black text-sm font-medium">Wind</div>
                        <div className="text-black text-xl font-semibold">
                            {data.weather.wind.speed} km/h
                        </div>
                    </div>

                    <div className="px-4 py-3 rounded backdrop-blur-xl bg-white/20 flex-col justify-center items-center gap-1 flex">
                        <div className="text-black text-sm font-medium">
                            Feels Like
                        </div>
                        <div className="text-black text-xl font-semibold">
                            {Math.round(data.weather?.main?.feels_like ?? 0)}°
                        </div>
                    </div>
                </div>
                <div className="self-stretch text-black text-lg font-medium font-Outfit mb-2">
                    Air Quality
                </div>
                <div className="self-stretch md:justify-between justify-center items-center gap-4 md:flex-row flex flex-col">
                    <div className="w-[72px] h-[72px] px-1 py-[7px] rounded-[100px] backdrop-blur-2xl justify-center items-center flex">
                        <div className="w-[58px] h-[59px] relative">
                            <img
                                className="w-[58px] h-[44.92px] left-0 top-[-0.19px] absolute"
                                src="/Gauge.png"
                                loading="lazy"
                                alt="guage-img"
                            />
                            <div className="w-[5.67px] h-[5.67px] left-[43.12px] top-[10.02px] absolute origin-top-left rotate-[-60deg] bg-white rounded-full" />
                            <div className="w-[30px] left-[14px] top-[44px] absolute text-center text-black text-xs font-normal font-Outfit">
                                AQI
                            </div>
                            <div className="w-[46px] left-[6px] top-[12.50px] absolute text-center text-black text-2xl font-normal font-Outfit">
                                {data.air.list[0]?.main?.aqi}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2">
                        <div className="px-3 py-2 rounded backdrop-blur-md bg-white/20 flex-col justify-center items-center gap-1 flex">
                            <div className="text-black text-xs font-medium">
                                PM2.5
                            </div>
                            <div className="text-black text-sm font-semibold">
                                {data.air?.list[0].components?.pm2_5 ?? 0} µg/m³
                            </div>
                        </div>
                        <div className="px-3 py-2 rounded backdrop-blur-md bg-white/20 flex-col justify-center items-center gap-1 flex">
                            <div className="text-black text-xs font-medium">O₃</div>
                            <div className="text-black text-sm font-semibold">
                                {Math.floor(data.air.list[0].components?.o3 ?? 0)} µg/m³
                            </div>
                        </div>
                        <div className="px-3 py-2 rounded backdrop-blur-md bg-white/20 flex-col justify-center items-center gap-1 flex">
                            <div className="text-black text-xs font-medium">
                                SO₂
                            </div>
                            <div className="text-black text-sm font-semibold">
                                {Math.floor(data.air.list[0].components?.so2 ?? 0)} µg/m³
                            </div>
                        </div>
                    </div>
                </div>

                <div className="self-stretch px-4 py-2 text-center rounded backdrop-blur-md bg-white/20">
                    <div className="text-black text-sm font-medium">
                        {data.air.list[0]?.main?.aqi !== null &&
                            (data.air.list[0]?.main?.aqi <= 50
                                ? 'Good'
                                : data.air.list[0]?.main?.aqi <= 100
                                    ? 'Moderate'
                                    : data.air.list[0]?.main?.aqi <= 150
                                        ? 'Unhealthy for Sensitive Groups'
                                        : data.air.list[0]?.main?.aqi <= 200
                                            ? 'Unhealthy'
                                            : data.air.list[0]?.main?.aqi <= 300
                                                ? 'Very Unhealthy'
                                                : 'Hazardous')}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

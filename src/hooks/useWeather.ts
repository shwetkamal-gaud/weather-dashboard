import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useWeatherContext } from "../context/WeatherContext";

const API_KEY = "967165840376f2d1730f647188fb9d76";

const fetchWeather = async (city: string, unit: string) => {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: { q: city, units: unit, appid: API_KEY },
    });
    console.log(res.data)

    const airRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&limit=1&appid=${API_KEY}`
    );
    const airData = await airRes.json();
    return {
        weather: res.data,
        air: airData,
    };
};

export const useWeather = () => {
    const { city, unit } = useWeatherContext();
    return useQuery({
        queryKey: ["weather", city, unit],
        queryFn: () => fetchWeather(city, unit),
        staleTime: 30000,
        refetchInterval: 30000,
        retry: 1
    })
};

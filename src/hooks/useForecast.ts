import { useQuery } from "@tanstack/react-query";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

const fetchForecast = async (city: string) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("Failed to fetch forecast");
    return res.json();
};

export const useForecast = (city: string) => {
    return useQuery({
        queryKey: ["forecast", city],
        queryFn: () => fetchForecast(city),
        staleTime: 1000 * 60 * 5, 
    });
};

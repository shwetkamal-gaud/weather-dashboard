import { createContext, useContext, useState, useEffect } from "react";
import supabase  from "../lib/supabaseClient";
import { useUser } from "./UserContext";

type WeatherContextType = {
    city: string;
    setCity: (city: string) => void;
    unit: string;
    setUnit: (unit: string) => void;
};

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
    const [city, setCity] = useState("New York");
    const [unit, setUnit] = useState("metric");
    const user = useUser();

    useEffect(() => {
        const fetchPrefs = async () => {
            if (user) {
                const { data, error } = await supabase
                    .from("user_preferences")
                    .select("last_city")
                    .eq("user_id", user.id)
                    .limit(1);
                if (error) {
                    console.error("Supabase fetch error:", error.message);
                } else if (data && data.length >0 ) {
                    setCity(data[0].last_city);
                      }
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const res = await fetch(
                        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=967165840376f2d1730f647188fb9d76
`
                    );
                    const geoData = await res.json();
                    if (geoData[0]?.name) setCity(geoData[0].name);
                });
            }

        };
        
        fetchPrefs();

    }, [user]);

    const saveCity = async(newCity: string) => {
        setCity(newCity);
        console.log(newCity)
        if (user) {
            const { data, error } = await supabase
                .from("user_preferences")
                .upsert(
                    {
                        user_id: user.id,
                        last_city: newCity,
                    },
                    { onConflict: "user_id" }
                );

            if (error) {
                console.error("Error saving city:", error.message);
            } else {
                console.log("City saved successfully:", data);
          }
        }
    };

    return (
        <WeatherContext.Provider value={{ city, setCity: saveCity, unit, setUnit }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeatherContext = () => {
    const context = useContext(WeatherContext);
    if (!context) throw new Error("useWeatherContext must be used in provider");
    return context;
};

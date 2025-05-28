import { useState } from "react";
import { useWeatherContext } from "../context/WeatherContext";

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const { setCity } = useWeatherContext();

    const handleSearch = () => {
        if (input.trim()) setCity(input.trim());
    };

    return (
        <div className="flex gap-2">
            <input
                className="border px-3 py-1 rounded"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter city"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">
                Search
            </button>
        </div>
    );
};

import { useWeatherContext } from "../context/WeatherContext";

export const UnitToggle = () => {
    const { unit, setUnit } = useWeatherContext();
    return (
        <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        >
            {unit === "metric" ? "Switch to °F" : "Switch to °C"}
        </button>
    );
};

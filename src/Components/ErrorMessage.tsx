import { useWeather } from "../hooks/useWeather";

export const ErrorMessage = () => {
    const { error } = useWeather();
    if (!error) return null;

    return <div className="text-red-600 font-semibold mt-2">{error.message}</div>;
};

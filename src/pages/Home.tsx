import { SearchBar } from "../Components/SearchBar";
import { WeatherDisplay } from "../Components/WeatherDisplay";
import { ErrorMessage } from "../Components/ErrorMessage";
import { UnitToggle } from "../Components/UnitToggle";
import ForeCast from "../Components/ForeCast";

export const Home = () => {
    return (
        <div className="h-full p-6 w-full dark:bg-black/20 bg-zinc-400/20 rounded-2xl backdrop-blur-[32px]">
            <h1 className="text-3xl font-bold mb-6">🌦 Weather Dashboard</h1>
            <div className="flex flex-col sm:flex-row gap-4  items-center mb-4">
                <SearchBar />
                <UnitToggle />
            </div>
            <ErrorMessage />
            <WeatherDisplay />
            <div className="py-6">
                <h1 className="text-2xl font-bold ">5-Day Weather Forecast</h1>
                <ForeCast />
            </div>
        </div>
    );
};

import type { Weather } from "../types/WeatherTypes.ts";
import {Droplet} from "lucide-react";

interface HourlyCardProps {
    weather: Weather;
}

function HourlyCard({ weather }: HourlyCardProps) {
    const date = new Date(weather.dt * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const timeLabel = `${formattedHour}:${formattedMinutes} ${ampm}`;

    return (
        <div className={"flex flex-row justify-between items-center bg-base-200 rounded-lg p-3 shadow-md min-w-[220px] text-2xl"}>
            <div className={" font-medium text-gray-700"}>
                {timeLabel}
            </div>

            <div className={" font-semibold text-gray-600"}>
                {weather.temp}°C
            </div>

            <div>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather_icon}.png`}
                    alt={weather.weather_name}
                    className="size-16"
                />
            </div>

            <div className={" text-gray-600"}>
                {weather.weather_name}
            </div>

            <div className={" text-blue-500 flex items-center justify-center"}>
                <Droplet />
                {weather.humidity}%
            </div>
        </div>
    );
}

export default HourlyCard;

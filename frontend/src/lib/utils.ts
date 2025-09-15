import type {AdvisoryData, HourlyChartData} from "../types/WeatherTypes.ts";

export function mapHourlyWeather(advice: AdvisoryData | null): HourlyChartData[] {
    if (!advice) {
        return [];
    }

    return advice.hourly_weather.map((hour, idx) => {
        const date = new Date(Date.now() + idx * 3600 * 1000); // next 8 hours
        const hours = date.getHours();
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHour = hours % 12 || 12;
        const hourLabel = `${formattedHour} ${ampm}`;

        return {
            temp: hour.temp,
            weather_icon: hour.weather_icon,
            hourLabel: hourLabel,
        };
    });
}
export interface Weather {
    temp: number;
    humidity: number;
    weather_icon: string;
    weather_name: string;
    dt: number;
}

export interface Location {
    lat: number;
    lon: number;
}

export interface AdvisoryData {
    crop: string;
    location: Location;
    current_weather: Weather;
    hourly_weather: Weather[];
    current_advice: string[];
    general_hour_forecast_advice: string[];
}

export interface HourlyChartData {
    temp: number,
    weather_icon: string,
    hourLabel: string
}
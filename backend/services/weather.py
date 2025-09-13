import requests
from fastapi import HTTPException
from backend.utils.config import API_KEY

# Getting the weather
def get_weather_data(lat: float, lon: float):
    # https://openweathermap.org/current
    url=f"https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API_KEY}&units=metric&exclude=minutely,alerts"
    try:
        res = requests.get(url)   # fetches the data
        res.raise_for_status()    # raises errors if there is a base response
        return res.json()
    except requests.exceptions.RequestException as err:
        raise  HTTPException(status_code=500, detail=f"Failed to get response from Weather API: {str(err)}")

# hours cannot be zero
def holistic_hourly_forecast_advice(data, hours):
    if hours <= 0:
        hours = 1

    total_rain = 0
    max_humidity = 0
    max_temp = 0
    avg_clouds = 0
    max_wind = 0
    max_uvi = 0

    hourly_data = data.get("hourly", [])
    for hour in hourly_data[:hours]:
        rain = hour.get("rain", {}).get("1h", 0) or hour.get("pop", 0)
        total_rain += rain
        max_humidity = max(max_humidity, hour.get("humidity", 0))
        max_temp = max(max_temp, hour.get("temp", 0))
        avg_clouds += hour.get("clouds", 0)
        max_wind = max(max_wind, hour.get("wind_speed", 0))
        max_uvi = max(max_uvi, hour.get("uvi", 0))

    avg_clouds /= hours

    advice = []

    # Temperature
    if max_temp > 25:
        advice.append("🌡 ALERT: Temperature above 25°C — irrigate crops!")

    # Precipitation
    if total_rain > 0.1:
        advice.append("💧 NOTICE: Rain expected — consider drainage.")

    # Humidity
    if max_humidity > 80:
        advice.append("💦 ALERT: High humidity — apply fungicide!")

    # Cloudiness
    if avg_clouds > 75:
        advice.append("☁️ NOTICE: Very cloudy — reduce irrigation today!")

    # Wind
    if max_wind > 15:
        advice.append("🌬 ALERT: Strong wind — secure crops!")

    # UV
    if max_uvi > 8:
        advice.append("☀️ ALERT: High UV — protect sensitive crops from the sun!")

    return advice

def current_advice(data):
    current = data.get("current", {})
    temp = current.get("temp", 0)
    rain = current.get("rain", {}).get("1h", 0)
    humidity = current.get("humidity", 0)
    clouds = current.get("clouds", 0)
    wind = current.get("wind_speed", 0)
    uvi = current.get("uvi", 0)

    advice = []

    # Temperature
    if temp > 25:
        advice.append("🌡 ALERT: Temperature above 25°C — irrigate crops!")

    # Precipitation
    if rain > 0:
        advice.append("💧 NOTICE: Rain expected — consider drainage.")

    # Humidity
    if humidity > 80:
        advice.append("💦 ALERT: High humidity — apply fungicide!")

    # Cloudiness
    if clouds > 75:
        advice.append("☁️ NOTICE: Very cloudy — consider reducing irrigation!")

    # Wind
    if wind > 15:
        advice.append("🌬 ALERT: Strong wind — secure crops!")

    # UV
    if uvi > 8:
        advice.append("☀️ ALERT: High UV — protect crops from the sun!")

    return advice

def generate_advice(lat: float, lon: float, crop: str):
    data = get_weather_data(lat, lon)

    return {
        "crop": crop,
        "location": {"lat": lat, "lon": lon},
        "current_advice": current_advice(data),
        "general_hour_forecast_advice": holistic_hourly_forecast_advice(data, 8) # hours cannot be 0
    }
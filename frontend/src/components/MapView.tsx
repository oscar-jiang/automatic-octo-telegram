import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useAdviceStore} from "../stores/useAdviceStore.ts";
import {Droplet} from "lucide-react";
import {useNavigate} from "react-router-dom";

function MapUpdater({lat, lon} : {lat: number, lon: number} ) {
    const map = useMap();
    map.setView([lat,lon], map.getZoom());

    return null;
}

function MapView() {
    const { advice } = useAdviceStore();
    const navigate = useNavigate();

    const lat = advice?.location.lat || 49.2827;
    const lon = advice?.location.lon || -123.1207;

    const date = new Date(advice?.current_weather.dt * 1000 || 0);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const timeLabel = `${formattedHour}:${formattedMinutes} ${ampm}`;

    const handleNewLocation = () => {
        navigate("/");
    }

    return (
        <div className={"card bg-base-200 p-1 w-full mx-auto border-1 border-base-300/70 font-fira"}>
            <div className={"space-y-0 ml-2 mt-2 mr-2"}>
                {/* Location */}
                <div className={"flex flex-row items-center space-x-2 justify-between"}>
                    <div className={"flex flex-row items-center space-x-1"}>
                        <div>
                            Location: {advice?.location.lat}, {advice?.location.lon}
                        </div>

                        <div>
                            At {timeLabel}
                        </div>
                    </div>

                    <button
                        className={"btn btn-primary btn-xs"}
                        onClick={handleNewLocation}
                    >
                        New Location
                    </button>
                </div>

                {/* Current Weather (aligned horizontally) */}
                <div className={"flex flex-row items-center justify-between"}>
                    {/* Weather */}
                    <div className={"flex flex-row space-x-2 items-center"}>
                        {/* Temperature */}
                        <div className={"text-3xl font-bold"}>
                            {advice?.current_weather.temp}°C
                        </div>

                        {/* Weather name */}
                        <div className={"text-3xl font-semibold"}>
                            {advice?.current_weather.weather_name}
                        </div>

                        {/* Weather icon */}
                        <div>
                            <img
                                src={`https://openweathermap.org/img/wn/${advice?.current_weather.weather_icon}@2x.png`}
                                alt={advice?.current_weather.weather_name}
                                className="size-12 p-0 m-0"
                            />
                        </div>
                    </div>

                    {/* Humidity */}
                    <div className={" text-blue-500 flex items-center justify-center text-2xl"}>
                        <Droplet />
                        {advice?.current_weather.humidity}%
                    </div>
                </div>
            </div>



            <div className={"card-body p-1"}>
                <MapContainer
                    center={[lat, lon]}
                    zoom={13}
                    className={"h-120 w-full rounded-lg"}
                >
                    <TileLayer
                        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                        attribution={'&copy; OpenStreetMap contributors'}
                    />

                    <Marker position={[lat, lon]}>
                        <Popup>
                            {advice
                                ? `Farm location: ${lat}, ${lon}`
                                : "Default location: Vancouver"}
                        </Popup>
                    </Marker>
                    
                    <MapUpdater lat={lat} lon={lon} />
                </MapContainer>
            </div>
        </div>
    );
}

export default MapView;

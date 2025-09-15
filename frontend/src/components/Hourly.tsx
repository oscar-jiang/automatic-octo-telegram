import { useAdviceStore } from "../stores/useAdviceStore.ts";
import HourlyCard from "./HourlyCard.tsx";

function Hourly() {
    const { advice } = useAdviceStore();

    return (
        <div className={"w-full font-fira flex flex-col gap-4 mt-4"}>
            {advice?.hourly_weather.map((weather, idx) => (
                <HourlyCard key={idx} weather={weather} />
            ))}
        </div>
    );
}

export default Hourly;

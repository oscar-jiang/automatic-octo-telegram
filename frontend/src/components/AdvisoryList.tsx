import { useAdviceStore } from "../stores/useAdviceStore.ts";

function AdvisoryList() {
    const { advice } = useAdviceStore();

    if (!advice) {
        return <p>No advice yet. Submit your location and crop above.</p>;
    }

    return (
        <div className={"space-y-4 font-fira"}>
            <div className={"p-2 bg-base-200 rounded-md shadow-sm"}>
                <h1 className={"font-bold"}>🌾 Current Crop Selected: {advice.crop}</h1>

                <div className={"flex flex-col space-y-2"}>
                    <div className={"p-2 bg-base-100 rounded-md shadow-sm min-h-[263px]"}>
                        <h1 className={"font-semibold"}>Current Advice:</h1>
                        <ul className={"list-disc list-inside"}>
                            {advice.current_advice.length > 0 ? (
                                <ul className={"list-disc list-inside"}>
                                    {advice.current_advice.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            ) : (
                                <div className={"text-gray-500 italic"}>🤔 No alerts</div>
                            )}
                        </ul>
                    </div>

                    <div className={"p-2 bg-base-100 rounded-md shadow-sm min-h-[265px]"}>
                        <h1 className={"font-semibold"}>Hourly Forecast Advice:</h1>
                        <h4 className={"text-xs mb-2"}>Based on the next 8 hours</h4>
                        {advice.general_hour_forecast_advice.length > 0 ? (
                            <ul className={"list-disc list-inside"}>
                                {advice.general_hour_forecast_advice.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <div className={"text-gray-500 italic"}>🤔 No alerts</div>
                        )}
                    </div>
                </div>
            </div>


        </div>
    );
}

export default AdvisoryList;

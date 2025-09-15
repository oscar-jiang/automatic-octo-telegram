import MapView from "../components/MapView.tsx";
import Hourly from "../components/Hourly.tsx";
import AdvisoryList from "../components/AdvisoryList.tsx";
import {useAdviceStore} from "../stores/useAdviceStore.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import HourlyChart from "../components/HourlyChart.tsx";
import {mapHourlyWeather} from "../lib/utils.ts";

function DashboardPage() {
    const { advice } = useAdviceStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!advice) {
            toast.error("You must select the location of the farm to view dashboard data!");
            navigate("/")
        }
    }, [advice, navigate]);

    const chartData = mapHourlyWeather(advice);

    return (
        <div className={"p-6 space-y-6 max-w-[1440px] mx-auto font-fira"}>

            {/* Stacked Horizontally */}
            <div className={"flex flex-row gap-6 w-full"}>
                {/* Left column */}
                <div className={"flex-1 flex flex-col gap-4"}>
                    <MapView />
                    <Hourly />
                </div>

                {/* Sidebar */}
                <div className={"w-80 flex flex-col space-y-6"}>
                    <AdvisoryList />

                    <div className={"p-2 bg-base-200 rounded-md shadow-sm"}>
                        <h1 className={"font-bold"}>📈 Weather Charts</h1>

                        <HourlyChart data={chartData || null}/>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default DashboardPage;
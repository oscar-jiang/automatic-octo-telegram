import {
    AreaChart,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Legend,
    Line,
} from "recharts";
import type {HourlyChartData} from "../types/WeatherTypes.ts";

interface Props {
    data: HourlyChartData[] | null;
}

function HourlyChart({ data }: Props) {
    if (!data) {
        return null;
    }

    return (
        <div className={"w-full h-80 p-4 bg-base-100 rounded-lg shadow-md"}>
            <h2 className={"font-bold"}>Temperature Over 8 Hours</h2>

            <ResponsiveContainer width={"100%"} height={"100%"}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray={"3 3"} />
                    <XAxis dataKey={"hourLabel"} />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line type={"monotone"} dataKey={"temp"} stroke={"#8884d8"} name={"Temperature"} />

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
export default HourlyChart;

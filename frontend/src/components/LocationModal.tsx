import {useState} from "react";
import {useAdviceStore} from "../stores/useAdviceStore.ts";
import toast from "react-hot-toast";
import {Loader2} from "lucide-react";
import {useNavigate} from "react-router-dom";

function LocationModal() {
    const { isGettingAdvice, getAdvice } = useAdviceStore();
    const [formData, setFormData] = useState({
        lat: "",
        lon: "",
        crop: "Corn"
    });
    const navigate = useNavigate();

    const validateForm = (): string | boolean => {
        const lat = formData.lat.trim();
        const lon = formData.lon.trim();
        const crop = formData.crop;

        if (!lat || !lon || !crop) {
            return toast.error("All fields are required.");
        }

        const latNum = parseFloat(lat);
        const lonNum = parseFloat(lon);

        if (isNaN(latNum) || latNum < -90 || latNum > 90) {
            return toast.error("Latitude must be a number between -90 and 90.");
        }

        if (isNaN(lonNum) || lonNum < -180 || lonNum > 180) {
            return toast.error("Longitude must be a number between -180 and 180.");
        }

        return true;
    };

    const handleSubmit = async () => {
        const isValid: string | boolean = validateForm();

        if (isValid === true) {
            try {
                await getAdvice(formData);
                setFormData({
                    lat: "",
                    lon: "",
                    crop: "Corn",
                });

                navigate("/dashboard");
            } catch (e) {
                console.error("Could not get advice for the location.")
            }
        }
    };


    return (
        <div className={"flex justify-center items-center h-screen bg-base-200 font-fira"}>
            <div className={"card w-96 bg-base-100 shadow-xl"}>
                <div className={"card-body"}>
                    <h2 className={"card-title flex justify-center"}>🌾 Farm Alerts</h2>
                    <label className={"form-control w-full"}>
                        <span className={"label-text"}>Latitude</span>
                        <input
                            type={"number"}
                            value={formData.lat}
                            onChange={(e) => setFormData({...formData, lat: e.target.value})}
                            className={"input input-bordered w-full"}
                            placeholder={"e.g. 48.10"}
                        />
                    </label>
                    <label className={"form-control w-full"}>
                        <span className={"label-text"}>Longitude</span>
                        <input
                            type={"number"}
                            value={formData.lon}
                            onChange={(e) => setFormData({...formData, lon: e.target.value})}
                            className={"input input-bordered w-full"}
                            placeholder={"e.g. 16.46"}
                        />
                    </label>
                    <label className={"form-control w-full"}>
                        <span className={"label-text"}>Crop</span>
                        <select
                            value={formData.crop}
                            onChange={(e) => setFormData({...formData, crop: e.target.value})}
                            className={"select select-bordered w-full"}
                        >
                            <option value={"corn"}>Corn</option>
                            <option value={"soybeans"}>Soybeans</option>
                            <option value={"wheat"}>Wheat</option>
                            <option value={"barley"}>Barley</option>
                            <option value={"rice"}>Rice</option>
                            <option value={"potatoes"}>Potatoes</option>
                            <option value={"tomatoes"}>Tomatoes</option>
                            <option value={"carrots"}>Carrots</option>
                            <option value={"onions"}>Onions</option>
                            <option value={"cabbage"}>Cabbage</option>
                            <option value={"broccoli"}>Broccoli</option>
                            <option value={"lettuce"}>Lettuce</option>
                            <option value={"spinach"}>Spinach</option>
                            <option value={"peas"}>Peas</option>
                            <option value={"beans"}>Beans</option>
                            <option value={"sunflower"}>Sunflower</option>
                        </select>
                    </label>
                    <div className={"card-actions justify-center mt-4"}>
                        <button
                            className={"btn btn-primary"}
                            onClick={handleSubmit}
                            disabled={isGettingAdvice}
                        >
                            {isGettingAdvice ? (
                                <Loader2 className={"animate-spin h-5 w-5"}  />
                            ) : (
                                <span>Get Advice</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationModal;
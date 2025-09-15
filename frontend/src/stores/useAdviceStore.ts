import {create} from "zustand";
import {axiosInstance} from "../lib/axios.ts";
import toast from "react-hot-toast";
import type {AdvisoryData} from "../types/WeatherTypes.ts";

type AdviceStore = {
    advice: AdvisoryData | null;
    isGettingAdvice: boolean;
    getAdvice: (data: {lat: string, lon: string, crop: string}) => Promise<any>;
}

export const useAdviceStore = create<AdviceStore>((set) => ({
    advice: null,
    isGettingAdvice: false,
    getAdvice: async (data) => {
      set({ isGettingAdvice: true });
      try {
          const {lat, lon, crop} = data;
          const response = await axiosInstance.get("/advisory/get-advice", {
              params: { lat, lon, crop }
          });

          console.log(response.data);
          set({ advice: response.data });
      } catch (e) {
          toast.error("Something went wrong getting advice.");
      } finally {
          set({ isGettingAdvice: false });
      }
    },
}));
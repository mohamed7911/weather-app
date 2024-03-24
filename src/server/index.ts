import {publicIpv4} from "public-ip";
import Api from "./axios";
import {Location, WeatherData} from "../interfaces/forecast";

export const getData = (queryParams: any): Promise<WeatherData> => {
  return Api().get("forecast.json", {params: queryParams});
};

export const getLocation = async (): Promise<Location[]> => {
    const ip = await publicIpv4();
    return Api().get("search.json", {params: {q: ip}});
};

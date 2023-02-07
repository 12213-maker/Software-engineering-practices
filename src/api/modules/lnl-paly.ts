import http from "@/api";
import { placelistvalue } from "../interface/index";

export const placeList = (params: placelistvalue) => {
	return http.get("/place/list", params, { headers: { noLoading: true } });
};

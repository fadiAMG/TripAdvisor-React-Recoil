import axios from "axios";
import { selectorFamily } from "recoil";
import { filterType } from "../Atoms/FilterType";

export const currentPlaces = selectorFamily({
  key: "CurrentPlaces",
  get:
    (boundries) =>
    async ({ get }) => {
      const filter = get(filterType);
      const {
        data: { data },
      } = await axios.get(
        `https://travel-advisor.p.rapidapi.com/${filter}/list-in-boundary`,
        {
          params: {
            bl_latitude: boundries.sw.lat,
            tr_latitude: boundries.ne.lat,
            bl_longitude: boundries.sw.lng,
            tr_longitude: boundries.ne.lng,
          },
          headers: {
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            "X-RapidAPI-Key":
              "a21d35cbcemsh770cb925ca72f39p150a42jsn835a9e55a28f",
          },
        }
      );

      return data;
    },
});

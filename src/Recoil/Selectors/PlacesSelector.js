import axios from "axios";
import { selectorFamily } from "recoil";

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const currentPlaces = selectorFamily({
  key: "CurrentPlaces",
  get:
    ({ ne, sw }) =>
    async ({ get }) => {
      const {
        data: { data },
      } = await axios.get(URL, {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          "X-RapidAPI-Key":
            "a21d35cbcemsh770cb925ca72f39p150a42jsn835a9e55a28f",
        },
      });

      return data;
    },
});

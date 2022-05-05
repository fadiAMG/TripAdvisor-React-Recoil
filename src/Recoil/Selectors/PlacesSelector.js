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
            "1f5984df82mshf426006cfc7aa57p105afdjsnee96d20bf24a",
        },
      });

      return data;
    },
});

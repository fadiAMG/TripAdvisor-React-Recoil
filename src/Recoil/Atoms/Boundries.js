import { atom } from "recoil";

export const mapBoundries = atom({
  key: "MapBoundries",
  default: { sw: {}, ne: {} },
});

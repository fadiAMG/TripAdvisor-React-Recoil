import { selector } from "recoil";
import { ratingFilter } from "../Atoms/RatingFilter";
import { searchResults } from "../Atoms/SearchResults";

export const ratingSelector = selector({
  key: "ratingSelector",
  get: ({ get }) => {
    const availablePlaces = get(searchResults);
    const currentRating = get(ratingFilter);

    const filteredPlaces = availablePlaces.filter(
      (place) => place.rating > currentRating
    );
    return filteredPlaces;
  },
});

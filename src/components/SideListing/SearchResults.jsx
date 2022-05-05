import { Grid } from "@material-ui/core";
import { createRef, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mapBoundries } from "../../Recoil/Atoms/Boundries";
import { childSelected } from "../../Recoil/Atoms/ChildSelected";
import { filterType } from "../../Recoil/Atoms/FilterType";
import { searchResults } from "../../Recoil/Atoms/SearchResults";
import { currentPlaces } from "../../Recoil/Selectors/PlacesSelector";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const SearchResults = () => {
  const [elRefs, setElRefs] = useState([]);
  // get childSelected element
  const [selected, setSelected] = useRecoilState(childSelected);

  const locationType = useRecoilValue(filterType);
  const currentBoundries = useRecoilValue(mapBoundries);
  //retrieve all places available from the selector
  const placesAvailable = useRecoilValue(currentPlaces(currentBoundries));

  const setSearchResults = useSetRecoilState(searchResults);

  // after evaluating the api call, we set the results to
  // searchResults Atom in order to use it as cached anywhere in the app
  useEffect(() => {
    setSearchResults(placesAvailable);
    setSelected(0);
    console.log(locationType);
    const refs = Array(placesAvailable.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [placesAvailable, setSearchResults, locationType]);

  return (
    <>
      {placesAvailable?.map((place, index) => (
        <Grid ref={elRefs[index]} item key={index} xs={12}>
          <PlaceDetails
            place={place}
            selected={Number(selected) === index}
            refProp={elRefs[index]}
          />
        </Grid>
      ))}
    </>
  );
};

export default SearchResults;

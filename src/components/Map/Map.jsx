import GoogleMapReact from "google-map-react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { mapBoundries } from "../../Recoil/Atoms/Boundries";
import { coordinatesState } from "../../Recoil/Atoms/CoordinatesAtom";
import { childSelected } from "../../Recoil/Atoms/ChildSelected";
import { searchResults } from "../../Recoil/Atoms/SearchResults";
import MapMarker from "./MaMarker";
import useStyles from "./styles";
import { ratingSelector } from "../../Recoil/Selectors/RatingSelector";

const Map = () => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useRecoilState(coordinatesState);
  const setMapBoundries = useSetRecoilState(mapBoundries);

  // detect any changes to the actual coordinates of user's view
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, [setCoordinates]);

  // an Atom for search results is created to cache the api call
  // in order not to use suspense with the map component
  //  as it doesn't display items on map correctly
  const placesAvailable = useRecoilValue(ratingSelector);

  //setChildSelected Value in order to scroll into it at SideListing
  const setChildSelected = useSetRecoilState(childSelected);
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{ disableDefaultUI: true, zoomControl: true }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setMapBoundries({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw,
          });
        }}
        onChildClick={(e) => setChildSelected(e)}
      >
        {placesAvailable?.map((place, index) => (
          <MapMarker
            place={place}
            key={index}
            lat={place.latitude ? Number(place.latitude) : null}
            lng={place.longitude ? Number(place.longitude) : null}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;

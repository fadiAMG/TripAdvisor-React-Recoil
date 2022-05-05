import {
  CircularProgress,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";
import { Suspense, useState } from "react";
import SearchResults from "./SearchResults";
import useStyles from "./styles";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { filterType } from "../../Recoil/Atoms/FilterType";

const SideListing = () => {
  const classes = useStyles();
  const setLocationType = useSetRecoilState(filterType);
  const locationType = useRecoilValue(filterType);
  const [locationRating, setLocationRating] = useState("");

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, hotels & attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel> Location </InputLabel>
        <Select
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
        >
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel> Rating</InputLabel>
        <Select
          value={locationRating}
          onChange={(e) => setLocationRating(e.target.value)}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={1}>Above 3.0</MenuItem>
          <MenuItem value={2}>Above 4.0</MenuItem>
          <MenuItem value={3}>Abrove 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        <Suspense fallback={<CircularProgress className={classes.loading} />}>
          <SearchResults />
        </Suspense>
      </Grid>
    </div>
  );
};

export default SideListing;

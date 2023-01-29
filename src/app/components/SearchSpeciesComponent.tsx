import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { useState } from "react";
import {
  fetchCharactersAsync,
  setFilterParams,
} from "../../features/catalog/catalogSlice";

export default function SearchComponent() {
  const { filterBy } = useAppSelector((state) => state.catalog);
  const [species, setSpecies] = useState(filterBy.species);

  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setFilterParams({ species: event.target.value }));
    dispatch(fetchCharactersAsync());
  }, 1000);

  return (
    <TextField
      label="Enter species"
      variant="filled"
      value={species || ""}
      onChange={(event: any) => {
        setSpecies(event.target.value);
        debouncedSearch(event);
      }}
      fullWidth
    />
  );
}

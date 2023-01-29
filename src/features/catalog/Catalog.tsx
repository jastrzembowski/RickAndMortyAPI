import { useEffect, useState } from "react";
import {
  characterSelectors,
  fetchCharactersAsync,
  setFilterParams,
  setPageNum,
} from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import CharacterCard from "./CharacterCard";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import { Button, Pagination } from "@mui/material";
import "./catalog.scss";
import SearchComponent from "../../app/components/SearchNameComponent";
import SearchSpeciesComponent from "../../app/components/SearchSpeciesComponent";
import LoadingComponent from "./LoadingComponent";

export default function Catalog() {
  const catalog = useAppSelector(characterSelectors.selectAll);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(false);

  const { charactersLoaded, filterBy } = useAppSelector(
    (state) => state.catalog
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPage(1);
    dispatch(fetchCharactersAsync());
  }, [
    filterBy.gender,
    filterBy.name,
    filterBy.species,
    filterBy.status,
    dispatch,
  ]);

  useEffect(() => {
    if (!charactersLoaded) dispatch(fetchCharactersAsync());
  }, [charactersLoaded, dispatch]);

  const status = ["Alive", "Dead", "Unknown"];
  const gender = ["Female", "Male", "Genderless", "Unknown"];
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    dispatch(setPageNum({ page: value }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="main-container">
      <div className="catalog-container">
        <aside className="filters-container desktop">
          <div className="filter-box">
            <h1>Filter characteres</h1>
            <h3>Search by name</h3>
            <SearchComponent />
            <h3>Search by status</h3>
            <CheckboxButtons
              items={status}
              checked={filterBy.status}
              onChange={(items: string[]) =>
                dispatch(setFilterParams({ status: items }))
              }
            />
            <h3>Search by gender</h3>
            <CheckboxButtons
              items={gender}
              checked={filterBy.gender}
              onChange={(items: string[]) =>
                dispatch(setFilterParams({ gender: items }))
              }
            />
            <h3>Search by species</h3>
            <SearchSpeciesComponent />
          </div>
        </aside>
        {filters && (
          <div className="filter-box media">
            <h1>Filter characteres</h1>
            <h3>Search by name</h3>
            <SearchComponent />
            <h3>Search by status</h3>
            <CheckboxButtons
              items={status}
              checked={filterBy.status}
              onChange={(items: string[]) =>
                dispatch(setFilterParams({ status: items }))
              }
            />
            <h3>Search by gender</h3>
            <CheckboxButtons
              items={gender}
              checked={filterBy.gender}
              onChange={(items: string[]) =>
                dispatch(setFilterParams({ gender: items }))
              }
            />
            <h3>Search by species</h3>
            <SearchSpeciesComponent />
          </div>
        )}

        <Button sx={{
            border: "2px solid black",
            backgroundColor: "#59c8ec",
            fontWeight: 600,
            width: "150px",
            marginTop: "10px",
            alignSelf: "flex-end",
            marginRight: "20px",
            color: "black",
            "&:hover": {
              backgroundColor: "#e762d7",
            },
          }} onClick={() => setFilters(!filters)} className="media">
          {!filters ? "Show filters" : "Hide filters"}
        </Button>
        {!charactersLoaded ? (
          <LoadingComponent />
        ) : (
          <div className="cards-container">
            <div className="cards-box">
              {charactersLoaded &&
                Object.entries(catalog[0].results).map((result) => (
                  <CharacterCard result={result[1]} key={result[0]} />
                ))}{" "}
            </div>
            {charactersLoaded && (
              <Pagination
                size="large"
                count={catalog[0].info.pages}
                style={{ alignSelf: "center" }}
                page={page}
                onChange={handleChange}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

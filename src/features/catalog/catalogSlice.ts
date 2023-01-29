import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import {
  Character,
  FilterBy,
  Info,
  Response,
} from "../../app/models/interfaces";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
  charactersLoaded: boolean;
  appStatus: string;
  info: Info;
  results: Character[];
  filterBy: FilterBy;
  filtersLoaded: boolean;
  page?: number
}

const charactersAdapter = createEntityAdapter<Response>({
});

function getAxiosParams(filterBy: FilterBy) {
  const params = new URLSearchParams();
  if (filterBy.page) params.append("page", filterBy.page.toString());
  if (filterBy.name) params.append("name", filterBy.name.toString());
  if (filterBy.status) params.append("status", filterBy.status.toString());
  if (filterBy.gender) params.append("gender", filterBy.gender.toString());
  if (filterBy.species) params.append("species", filterBy.species.toString());
  return params;
}

export const fetchCharactersAsync = createAsyncThunk<
  Response,
  void,
  { state: RootState }
>("catalog/fetchCharactersAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.filterBy);
  try {
    const response = await agent.Catalog.list(params);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchCharacterAsync = createAsyncThunk<Response, number>(
  "catalog/fetchCharacterAsync",
  async (id, thunkAPI) => {
    try {
      return await agent.Catalog.details(id);
    } catch (error: any) {
      if (thunkAPI.rejectWithValue({ error: error.data }))
      return
    }
  }
);



export const catalogSlice = createSlice({
  name: "catalog",
  initialState: charactersAdapter.getInitialState<CatalogState>({
    charactersLoaded: false,
    filtersLoaded: false,
    appStatus: "idle",
    info: {} as Info,
    results: {} as Character[],
    filterBy: [] as FilterBy,
  }),
  reducers: {
    setFilterParams: (state, action) => {
      state.charactersLoaded = false;
      state.filterBy = { ...state.filterBy, ...action.payload, page: 1 };
    },
    setPageNum: (state, action) => {
      state.charactersLoaded = false;
      state.filterBy = { ...state.filterBy, ...action.payload};
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharactersAsync.pending, (state) => {
      state.appStatus = "pendingFetchCharacters";
    });
    builder.addCase(fetchCharactersAsync.fulfilled, (state, action) => {
      console.log(action);
      charactersAdapter.setOne(state, action.payload)
      state.appStatus = "idle";
      state.charactersLoaded = true;
    });
    builder.addCase(fetchCharactersAsync.rejected, (state, action) => {
      console.log(action);
      state.appStatus = "idle";
      state.charactersLoaded = false;
    });
    builder.addCase(fetchCharacterAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.appStatus = "idle";
    });
    builder.addCase(fetchCharacterAsync.pending, (state) => {
      state.appStatus = "pendingFetchCharacter";
    });
    builder.addCase(fetchCharacterAsync.fulfilled, (state, action) => {
      charactersAdapter.upsertOne(state, action.payload);
      state.appStatus = "idle";
    });
  },
});

export const characterSelectors = charactersAdapter.getSelectors(
  (state: RootState) => state.catalog
);
export const { setFilterParams, setPageNum } = catalogSlice.actions;

import { TextField, debounce } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { useState } from 'react';
import { setFilterParams } from '../../features/catalog/catalogSlice';

export default function SearchComponent() {

    const {filterBy } = useAppSelector((state) => state.catalog)
    const [name, setName] = useState(filterBy.name);

    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setFilterParams({name : event.target.value}))
    })

  return (
    <TextField
    label="Enter name"
    variant="filled"
    value={name || ""}
    onChange={(event: any) => {
        setName(event.target.value);
        debouncedSearch(event);
      }}
      fullWidth
    />
  )
}

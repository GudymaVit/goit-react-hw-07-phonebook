import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: '',
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filteredContact: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { filteredContact } = filterSlice.actions;
export const getFiltered = state => state.filter.filter;
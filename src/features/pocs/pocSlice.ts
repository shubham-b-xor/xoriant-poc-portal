import { createSlice } from '@reduxjs/toolkit';
import { POC } from '../../types';
import pocsData from '../../data/pocs.json'; // <-- Import your local JSON

interface POCState {
    list: POC[];
    selectedPOC: POC | null;
    filter: 'all' | 'Active' | 'Completed' | 'Planned';
    search: string;
}

const initialState: POCState = {
    list: pocsData,   // <-- Load initial POCs from JSON here
    selectedPOC: null,
    filter: 'all',
    search: '',
};

const pocSlice = createSlice({
    name: 'pocs',
    initialState,
    reducers: {
        openPOCModal(state, action) {
            console.log('openPOCModal reducer called with:', action.payload);
            state.selectedPOC = action.payload;
        },
        closePOCModal(state) {
            state.selectedPOC = null;
        },
        setFilter(state, action) {
            state.filter = action.payload;
        },
        setSearch(state, action) {
            state.search = action.payload;
        },
    },
    // We can remove fetchPOCs async thunk & extraReducers if not using API anymore
});

export const {
    openPOCModal,
    closePOCModal,
    setFilter,
    setSearch,
} = pocSlice.actions;

export default pocSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "~/src/redux/redux-store";
type SortType = {
    sortId: number
    sortCategory: string
}
export interface FilterSliceState {
    categoryId: number
    searchValue: string
    sort: SortType
    currentPage: number
}

const initialState: FilterSliceState = {
    categoryId: 0,
    searchValue: '',
    sort: {
        sortId: 0,
        sortCategory: '',
    },
    currentPage: 1,
}


export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sort.sortCategory = action.payload.sort.sortCategory;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<SortType>) {
            const { sortId, sortCategory } = action.payload;
            state.sort.sortId = sortId;
            state.sort.sortCategory = sortCategory;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    },
})
export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;
export const { setCategoryId,setSearchValue, setFilters,  setSort,setCurrentPage} = filterSlice.actions

export default filterSlice.reducer
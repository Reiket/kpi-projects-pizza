import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {itemsAPI} from "../../api/api";
import {RootState} from "../redux-store";

type FetchPizzasArgs = {
    categoryId: number
    sortCategory: string
    conditionSort: boolean
    searchValue: string
    currentPage: number
}
export const fetchItems = createAsyncThunk<Array<PizzaItemType>, FetchPizzasArgs >(
    'pizzas/fetchItemsStatus',
    async (params) => {
        const {categoryId,sortCategory,conditionSort,searchValue,currentPage} = params;
        const {data} = await itemsAPI.getItems(categoryId, sortCategory, conditionSort, searchValue, currentPage)
        return data
    }
)
export type PizzaItemType = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: Array<number>
    types: Array<number>
    rating: number
}
enum Status {
    Loading = 'loading',
    Error = 'error',
    Success = 'success'
}
interface PizzaSliceState {
    items: Array<PizzaItemType>
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.Loading,
}


export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Array<PizzaItemType>>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state, action) => {
            state.status = Status.Loading;
            state.items = [];
        })
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.Success
        })
        builder.addCase(fetchItems.rejected, (state, action) => {
            state.status = Status.Error
            state.items = [];
        })
    }
})
export const selectPizzaData = (state: RootState) => state.pizzas;
export const { setItems} = pizzasSlice.actions
export default pizzasSlice.reducer
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {RootState} from "../redux-store";

export type CartItemType = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}
interface CartSliceState {
    totalPrice: number
    items: Array<CartItemType>,
}

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    items: items,
    totalPrice: totalPrice,
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
             if (findItem) {
                 findItem.count--;
             }
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = calcTotalPrice(state.items)
        },
        clearItem(state) {
            state.items = [];
            state.totalPrice = 0
        }
    },
})
export  const selectCart = (state: RootState) => state.cart;
export const selectCartItem = (id: string ) => (state: RootState) => state.cart.items.find(obj => obj.id === id)
export const {addItem, removeItem,minusItem, clearItem } = cartSlice.actions
export default cartSlice.reducer


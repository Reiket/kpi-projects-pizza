import {CartItemType} from "~/src/redux/slices/cart-slice";

export const calcTotalPrice = (items: Array<CartItemType>) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) - sum;
    }, 0)
}
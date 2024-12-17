import axios from "axios";
import {PizzaItemType} from "../redux/slices/pizzas-slice";

export const itemsAPI = {
    getItems (index: number, sort: string, conditionSort: boolean, search: string, currentPage: number) {
        return axios.get<Array<PizzaItemType>>(`https://6489e5855fa58521cab06ffb.mockapi.io/items?${index === 0 ? '' : 'category=' + index}&sortBy=${sort}&order=${conditionSort ? "asc" : "desc"}&search=${search ? search : ""}&limit=4&page=${currentPage}`)
    },
    getItemsById(id: string | undefined) {
        return axios.get('https://6489e5855fa58521cab06ffb.mockapi.io/items/' + id)
    }
}












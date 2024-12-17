// @ts-ignore
import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {itemsAPI} from "../../../api/api";
type PizzaType = {
    imageUrl: string,
    title: string,
    price: number
}

const FullPizza : React.FC  = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [pizza, setPizza] = React.useState<PizzaType>();
    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await itemsAPI.getItemsById(id);
                setPizza(data);
            } catch (err) {
                alert("Помилка при загрузці піц!")
                navigate('/');
                console.log(err)
            }
        }
        fetchPizza();
    }, [])

    if(!pizza) {
        return <>"Loading......"</>
    }
    return (
        <div className={"__container"}>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <div>{pizza.price}</div>
        </div>
    );
}

export default FullPizza;


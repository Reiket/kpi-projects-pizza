import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addItem, CartItemType, selectCartItem} from "../../../redux/slices/cart-slice";
import {Link} from "react-router-dom";

type PropsType = {
    id: string
    title: string
    price: number
    sizes: Array<number>
    imageUrl: string
    types: Array<number>
}

const typeName:Array<string> = ["Тонка", "Традиційна"];
const Card: React.FC<PropsType> = ({id, title, price, sizes, imageUrl, types}) => {
    const dispatch = useDispatch();
    const [typeId, setTypeId] = React.useState(0);
    const [sizeId, setSizeId] = React.useState(0);
    const cartItem = useSelector(selectCartItem(id));
    const addedCount = cartItem ? cartItem.count : 0
    const onClickAdd = () => {
        const item: CartItemType = {
            id,
            title,
            price,
            imageUrl,
            type: typeName[typeId],
            size: sizes[sizeId],
            count: 0,

        };
        dispatch(addItem(item));
    }

    function onClickToType(index: number) {
       if (typeId !== index) {
           setTypeId(index);
       } else {
           setTypeId(0);
       }
    }

    function onClickToSize(index: number) {
        if (sizeId !== index) {
            setSizeId(index);
        } else {
            setSizeId(0);
        }
    }

    return (
        <div className="section__card card-item">
            <div className="card-item__body">
                <div className="card-item__image">
                    <Link to={`/pizza/${id}`}>
                        <img src={imageUrl} alt="Pizza-Card"/>
                    </Link>
                </div>
                <h3 className="card-item__title">{title}</h3>
                <div className="card-item__bar">
                    <ul className="card-item__category">
                        {types.map((value, index) => <li key={value} onClick={() => onClickToType(index)} className={typeId === index ? "card-item__button active" : "card-item__button"}>{typeName[value]}</li>)}
                    </ul>
                    <ul className="card-item__category">
                        {sizes.map((size, index) => <li key={size} onClick={() => onClickToSize(index)} className={sizeId === index ? "card-item__button active" : "card-item__button"}>{size} см.</li>)}
                    </ul>
                </div>
                <div className="card-item__content">
                    <p className="card-item__price">Від {price} грн.</p>
                    <button onClick={onClickAdd} className="card-item__add icon-plus">Добавити{addedCount > 0  &&  <span>{addedCount}</span>}</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
import React from 'react';

type SortCategoryType = {
    name: string
    sortProperty: string
}

type PropsType = {
    activeId: number
    sortId: number
    conditionSort: boolean
    onClickCategory: (index: number) => void
    onClickSort: (index: number, sortProperty: string) => void
    onClickConditionSort: () => void
}

type PopupClickType = MouseEvent & {
    composedPath:() =>  Array<Node>;
}
const Sort: React.FC<PropsType> = React.memo(({activeId,onClickConditionSort, onClickCategory, sortId, onClickSort, conditionSort}) => {
    const category: Array<string> = ['Всі', 'Мясні', 'Вегетеріанські', 'Гриль', 'Гострі', 'Закриті'];
    const sortCategory: Array<SortCategoryType> = [{name: 'популярності', sortProperty: 'rating'},{name: 'ціні', sortProperty:'price'},{name: 'алфавіту', sortProperty:'title'}]
    const [isOpenPopup, setIsOpenPopup] = React.useState(false);
    const sortRef = React.useRef<HTMLDivElement>(null);
    const onClickToPopup = () => {
        setIsOpenPopup(prev => !prev);
    }
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const _event = event as PopupClickType;
            if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
                setIsOpenPopup(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => document.body.removeEventListener('click', handleClickOutside);
    }, [])
    return (
        <div className="sort">
            <div className="sort__container">
                <ul className="sort__buttons">
                    {category.map((name, index) => <li key={index} onClick={() => onClickCategory(index)} className={activeId === index ? "sort__btn active" : "sort__btn"}>{name}</li>)  }
                </ul>
                <div ref={sortRef} className="sort__category">
                    <div className={`sort__text icon-arrow  ${isOpenPopup ? 'active' : ''}`}>Сортування по: <button onClick={ onClickConditionSort } className="button">{conditionSort ? "Зрост." : "Спад."}</button> <span onClick={onClickToPopup}>{sortCategory[sortId].name}</span></div>
                    <ul className= {isOpenPopup ? "sort__list active" : "sort__list"}>
                        {sortCategory.map((value, index) => <li onClick={() => {
                            onClickSort(index, value.sortProperty);
                            setIsOpenPopup(prev => !prev);
                        }} key={index} className={sortId === index ? "sort__item active" : "sort__item"}><span>{value.name}</span></li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
})

export default Sort;
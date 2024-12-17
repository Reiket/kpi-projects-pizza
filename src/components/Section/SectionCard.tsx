import React from 'react';
import Card from "./Card/Card";
import CardLoader from "./Card/CardLoader";
import qs from 'qs'
import Sort from "../Sort/Sort";
import Pagination from "./Pagination";
import {useSelector} from "react-redux";
import {
    FilterSliceState,
    selectFilter,
    selectSort,
    setCategoryId,
    setCurrentPage,
    setFilters,
    setSort
} from "../../redux/slices/filter-slice";
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {fetchItems, selectPizzaData} from "../../redux/slices/pizzas-slice";
import {useAppDispatch} from "../../redux/redux-store";


function SectionCard() {
    const [conditionSort, setConditionSort] = React.useState(true);

    const {items, status} = useSelector(selectPizzaData)
    const {categoryId, currentPage, searchValue} = useSelector(selectFilter);
    const { sortId, sortCategory } = useSelector(selectSort);

    const isSearch = React.useRef(false);
    const dispatch = useAppDispatch();

    const fetchPizzas =  () => {
        dispatch(fetchItems({categoryId, sortCategory, conditionSort, searchValue, currentPage}))
     }

    React.useEffect(() => {
        fetchPizzas();
        isSearch.current = false;
    }, [categoryId, sortCategory, conditionSort, searchValue, currentPage]);

    // React.useEffect(() => {
    //    if (isMounted.current) {
    //        const queryString    = qs.stringify({
    //            sortCategory,
    //            categoryId,
    //            currentPage,
    //        });
    //        navigate(`?${queryString}`);
    //    }
    //    isMounted.current = true;
    // }, [categoryId, sortCategory, conditionSort, searchValue, currentPage]);

    const onClickCategory = React.useCallback((index: number) => {
        dispatch(setCategoryId(index));
    }, [])

    const onClickSort = React.useCallback((sortId: number, sortCategory: string) => {
        dispatch(setSort({ sortId, sortCategory }));
    }, [])

    const onClickConditionSort = React.useCallback(() => {
        setConditionSort(prev => !prev);
    }, [])

    const onChangeCurrentPage = (num: number) => {
        dispatch(setCurrentPage(num));
    };

    return (
        <>
            <Sort activeId ={categoryId} sortId={sortId} onClickCategory={onClickCategory} conditionSort={conditionSort} onClickConditionSort={ onClickConditionSort }  onClickSort={onClickSort}/>
            <section className="section">
                <div className="section__container">
                    <h2 className="section__title">Всі піци</h2>
                    <div className="section__inner">
                        {status === 'loading' ? [...new Array(10)].map((_, index) => <CardLoader key={index}/>) : items.map((obj) => <Card key={obj.id} {...obj}/>)}
                    </div>
                   <Pagination currentPage={currentPage} onChangePage = {(num) => onChangeCurrentPage(num)}/>
                </div>
            </section>
        </>

    );
}

export default SectionCard;
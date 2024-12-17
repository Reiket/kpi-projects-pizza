import React from 'react';
import ReactPaginate from "react-paginate";
type PropsType = {
    currentPage: number
    onChangePage: (page: number) => void
}
const Pagination: React.FC<PropsType> = ({onChangePage, currentPage}) => {

    return (
        <>
            <ReactPaginate className={"pagination"}
                           breakLabel="..."
                           nextLabel=" >"
                           pageRangeDisplayed={4}
                           pageCount={3}
                           forcePage={currentPage - 1}
                           onPageChange={(e) => onChangePage(e.selected + 1)}
                           previousLabel="< "
                           renderOnZeroPageCount={null}
            />
        </>
    );
}

export default Pagination;
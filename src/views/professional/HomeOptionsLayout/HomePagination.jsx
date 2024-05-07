import React, { useContext, useEffect, useState } from 'react'
import CommonContext from '../../../hooks/CommonContext';
import ReactPaginate from 'react-paginate';

const HomePagination = () => {
    const { setCardArrayDuplicateSearch, cardArrayDuplicate,currentPage, setCurrentPage } = useContext(CommonContext);

    const [firstIndexValue, SetFirstIndexValue] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const RecordsPerPage = 10;

    useEffect(() => {
        const firstIndex = RecordsPerPage * currentPage;
        const LastIndex = RecordsPerPage * currentPage + RecordsPerPage;

        var jobCards = cardArrayDuplicate.slice(firstIndex, LastIndex)
        if(jobCards.length > 0){
            setCardArrayDuplicateSearch(jobCards)
            const numberOfPage = Math.ceil(cardArrayDuplicate.length / RecordsPerPage)
            setPageCount(numberOfPage)
        }else{
            var changeCurrentPage=currentPage-1
            if(changeCurrentPage >= 0){
                const firstIndex = RecordsPerPage * currentPage-1;
                const LastIndex = RecordsPerPage * currentPage-1 + RecordsPerPage;
        
                var jobCards = cardArrayDuplicate.slice(firstIndex, LastIndex)
                setCardArrayDuplicateSearch(jobCards)

                const numberOfPage = Math.ceil(cardArrayDuplicate.length / RecordsPerPage)
                setPageCount(numberOfPage)
            }
        }
    }, [cardArrayDuplicate])




    const handlePageClick = (value) => {
        SetFirstIndexValue(value.selected)
        setCurrentPage(value.selected)
        const firstIndex = RecordsPerPage * value.selected;
        const LastIndex = RecordsPerPage * value.selected + RecordsPerPage;

        var jobCards = cardArrayDuplicate.slice(firstIndex, LastIndex)
        setCardArrayDuplicateSearch(jobCards)

        const numberOfPage = Math.ceil(cardArrayDuplicate.length / RecordsPerPage)
        setPageCount(numberOfPage)
    }


    return (
        <>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={'...'}
                pageCount={Math.ceil(pageCount)}
                forcePage={currentPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link "}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </>
    )
}

export default HomePagination

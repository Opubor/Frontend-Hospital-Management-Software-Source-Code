import React from "react";
import ReactPaginate from "react-paginate";

function ReactPagination({ pageCount, handlePageClick }) {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        nextClassName="hover:bg-indigo-200"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        previousClassName="hover:bg-indigo-200"
        renderOnZeroPageCount={null}
        containerClassName="flex my-4 text-base"
        pageLinkClassName="bg-gray-100 px-2 hover:bg-indigo-200"
        previousLinkClassName="px-2"
        nextLinkClassName="px-2"
        activeLinkClassName="bg-indigo-900 rounded-sm text-white"
      />
    </>
  );
}

export default ReactPagination;

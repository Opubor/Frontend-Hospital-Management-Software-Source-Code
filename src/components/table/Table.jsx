import React from "react";

function Table({ children, mapFunction }) {
  return (
    <table className="border-collapse border border-gray-400 table-flex xl:w-full bg-white">
      {children}
      {mapFunction}
    </table>
  );
}

export default Table;

import React from "react";

function Tbody({ children }) {
  return (
    <tbody className="odd:bg-gray-100">
      <tr className="border border-gray-300 hover:bg-gray-300 text-base">
        {children}
      </tr>
    </tbody>
  );
}

export default Tbody;

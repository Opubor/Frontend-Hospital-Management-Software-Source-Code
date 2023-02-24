import React from "react";
import { Link } from "react-router-dom";

function ViewButton({ viewFunction, style, children, ...rest }) {
  return (
    <Link
      className={`bg-gray-500 px-2 flex justify-center items-center rounded-full text-sm text-white p-2 hover:bg-indigo-900 ${style}`}
      to={viewFunction}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default ViewButton;

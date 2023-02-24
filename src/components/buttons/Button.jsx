import React from "react";

function Button({ children, ...rest }) {
  return (
    <button
      {...rest}
      className="bg-indigo-700 px-12 py-2 rounded-md text-lg text-white hover:bg-indigo-900"
    >
      {children}
    </button>
  );
}

export default Button;

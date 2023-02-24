import React from "react";

function Textarea({ label, children, ...rest }) {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor="" className="mb-2 text-lg font-semibold">
        {label}
      </label>
      <textarea
        name=""
        id=""
        cols="30"
        rows="4"
        className="py-2 px-2 border border-gray-300 text-lg outline-none rounded-md"
        {...rest}
      >
        {children}
      </textarea>
    </div>
  );
}

export default Textarea;

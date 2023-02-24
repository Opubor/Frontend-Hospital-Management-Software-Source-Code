import React from "react";

function Select({ label, children, ...rest }) {
  return (
    <div className="flex flex-col mb-6">
      <label htmlFor="" className=" mb-2 text-lg font-semibold">
        {label}
      </label>
      <select
        {...rest}
        id=""
        className="w-full rounded-lg text-base p-2 outline-none"
      >
        {children}
      </select>
    </div>
  );
}

export default Select;

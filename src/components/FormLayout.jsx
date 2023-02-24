import React from "react";

function FormLayout({ children, formName }) {
  return (
    <div className=" flex justify-center">
      <div className="bg-indigo-100 w-3/5 shadow-md shadow-gray-400 h-auto p-12">
        <h1 className="font-bold text-2xl mb-6 border border-b-black">
          {formName}
        </h1>
        {children}
      </div>
    </div>
  );
}

export default FormLayout;

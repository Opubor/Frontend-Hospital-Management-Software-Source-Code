import React from "react";
import { ImSpinner9 } from "react-icons/im";

function Preloader() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="animate-spin text-2xl font-bold">
        {React.createElement(ImSpinner9, { size: "30" })}
      </div>
      <h1 className="text-md">Loading</h1>
    </div>
  );
}

export default Preloader;

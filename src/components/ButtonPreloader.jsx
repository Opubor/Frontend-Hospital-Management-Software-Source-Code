import React from "react";
import { ImSpinner9 } from "react-icons/im";

function ButtonPreloader() {
  return (
    <div className="flex gap-2 items-center justify-center">
      <h1>Loading</h1>
      <div className="animate-spin text-2xl font-bold">
        {React.createElement(ImSpinner9, { size: "20" })}
      </div>
    </div>
  );
}

export default ButtonPreloader;

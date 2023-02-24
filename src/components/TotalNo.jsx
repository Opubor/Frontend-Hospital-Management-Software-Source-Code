import React from "react";

function TotalNo({ totalnumber }) {
  return (
    <p className="text-base">
      Total:{" "}
      <span className="border border-indigo-900 px-2 text-white rounded-xl bg-blue-900">
        {totalnumber}
      </span>{" "}
    </p>
  );
}

export default TotalNo;

import React from "react";
import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-indigo-50">
      <h1 className="text-9xl font-bold text-indigo-900">403</h1>
      <h2 className="text-2xl text-indigo-500">Forbidden!!!</h2>
    </div>
  );
}

export default Forbidden;

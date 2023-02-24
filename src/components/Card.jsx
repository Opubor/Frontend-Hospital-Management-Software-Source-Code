import React from "react";
import { Link } from "react-router-dom";

function Card({ cardname, number, pic, linkTo, styles }) {
  return (
    <Link to={linkTo}>
      <div
        className={`h-28 border-b-4 border-b-blue-600 flex shadow-md shadow-gray-500 mb-4 bg-cover group ${styles}`}
        style={{ backgroundImage: `url(${pic})` }}
      >
        <div className="pl-4">
          <h1 className="text-4xl font-bold text-blue-600 group-hover:text-red-900">
            {number}
          </h1>
          <h2 className="text-sm text-blue-600 group-hover:text-red-900">
            {cardname}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default Card;

import React from "react";

function Refresh({ theme, refreshSvg, getDbData }) {
  return (
    <button
      className={` w-15 w-sm-10 w-md-7 w-xl-5 btn ${
        theme ? "btn-outline-light" : "btn-outline-dark"
      }`}
      onClick={() => {
        getDbData();
      }}
    >
      <img
        className={`w-100 ${theme ? "svgInvert" : null}`}
        src={refreshSvg}
      ></img>
    </button>
  );
}

export default Refresh;

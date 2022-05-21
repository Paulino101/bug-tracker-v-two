import React from "react";

import { motion } from "framer-motion";

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
      <motion.img
        whileTap={{ rotate: 360 }}
        className={`w-100 ${theme ? "svgInvert" : null}`}
        src={refreshSvg}
      ></motion.img>
    </button>
  );
}

export default Refresh;

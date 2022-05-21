import React, { useState } from "react";
import { motion } from "framer-motion";

function Filters({
  handleFilterAll,
  handleFilterIssues,
  handleFilterSolved,
  handleFilterAuthor,
}) {
  return (
    <>
      <div class="dropdown ms-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          class="btn btn-secondary dropdown-toggle "
          type="button"
          id="dropdownMenu2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Filters
        </motion.button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button
            onClick={handleFilterAll}
            class={`text-capitalize dropdown-item `}
            type="button"
          >
            all
          </button>
          <button
            onClick={handleFilterIssues}
            class="text-capitalize dropdown-item"
            type="button"
          >
            unsolved
          </button>
          <button
            onClick={handleFilterSolved}
            class="text-capitalize dropdown-item"
            type="button"
          >
            solved
          </button>
          <button
            onClick={handleFilterAuthor}
            class="text-capitalize dropdown-item"
            type="button"
          >
            created
          </button>
        </div>
      </div>
    </>
  );
}

export default Filters;

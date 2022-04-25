import React from "react";
import { Link } from "react-router-dom";

function PathNotFound() {
  return (
    <div>
      <p>This path doesnt exist</p><Link to="/">Go back to home</Link>
    </div>
  );
}

export default PathNotFound;

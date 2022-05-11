import React from "react";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./../components/ThemeToggle";

function ThemeToggleLogic() {
  let location = useLocation();
  let pathName = location.pathname;
  return (
    <>
      {pathName === "/" ? (
        <ThemeToggle />
      ) : pathName === "/register" ? (
        <ThemeToggle />
      ) : null}
    </>
  );
}

export default ThemeToggleLogic;

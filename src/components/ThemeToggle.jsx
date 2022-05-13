import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { darkThemeContext } from "../helpers/Context";
import sunSvg from "../svg/themeToggle/sun.svg";
import moonSvg from "../svg/themeToggle/moon.svg";

function ThemeToggle() {
  let location = useLocation();
  let pathName = location.pathname;

  const { theme, setTheme } = useContext(darkThemeContext);
  return (
    <>
      <div className={theme ? "bg-dark text-end" : "bg-white text-end"}>
        {theme ? (
          <button
            className={`w-20 w-md-10 w-xl-10 btn ${
              pathName === "/" ? "w-992px-10" : "w-992px-100"
            }`}
            onClick={() => {
              setTheme(false);
            }}
          >
            <img src={sunSvg} alt="" className="w-100 svgInvert" />
          </button>
        ) : (
          <button
            className={`w-20 w-md-10 w-xl-10 btn ${
              pathName === "/" ? "w-992px-10" : "w-992px-100"
            }`}
            onClick={() => {
              setTheme(true);
            }}
          >
            <img src={moonSvg} alt="" className="w-100" />
          </button>
        )}
      </div>
    </>
  );
}

export default ThemeToggle;

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
      <div className={`text-start `}>
        {theme ? (
          <button
            className={`w-20 w-sm-10 w-md-10 w-lg-15 w-xl-10 btn`}
            onClick={() => {
              setTheme(false);
            }}
          >
            <img src={sunSvg} alt="" className="w-100 svgInvert" />
          </button>
        ) : (
          <button
            className={`w-20 w-sm-10 w-md-10 w-lg-15 w-xl-10 btn `}
            onClick={() => {
              setTheme(true);
            }}
          >
            <img src={moonSvg} alt="" className="w-100 svgInvert" />
          </button>
        )}
      </div>
    </>
  );
}

export default ThemeToggle;

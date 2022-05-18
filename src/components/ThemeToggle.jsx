import React, { useContext } from "react";
import { auth } from "../firebaseConfig";
import { useLocation } from "react-router-dom";
import { darkThemeContext } from "../helpers/Context";
import sunSvg from "../svg/themeToggle/sun.svg";
import moonSvg from "../svg/themeToggle/moon.svg";

function ThemeToggle({ currentEmail }) {
  let location = useLocation();
  let pathName = location.pathname;

  const { theme, setTheme } = useContext(darkThemeContext);
  return (
    <>
      <div
        className={`text-start d-lg-flex align-items-center flex-row justify-content-lg-end w-xl-75 `}
      >
        {theme ? (
          <>
            <button
              className={`w-20 w-sm-10 w-md-10 w-lg-15 w-xl-10 p-xl-0 btn`}
              onClick={() => {
                setTheme(false);
              }}
            >
              <img src={sunSvg} alt="" className="w-100 svgInvert" />
            </button>
            <img
              src={`https://avatars.dicebear.com/api/identicon/${currentEmail}.svg`}
              className="display-none d-lg-initial nav-link w-lg-10"
              alt="user avatar"
            />
            <p className="nav-link m-auto display-none d-lg-initial">
              {currentEmail}
            </p>
          </>
        ) : (
          <>
            <button
              className={`w-20 w-sm-10 w-md-10 w-lg-15 w-xl-10 p-xl-0 btn `}
              onClick={() => {
                setTheme(true);
              }}
            >
              <img src={moonSvg} alt="" className="w-100 svgInvert" />
            </button>
            <img
              src={`https://avatars.dicebear.com/api/identicon/${currentEmail}.svg`}
              className="display-none d-lg-initial nav-link w-lg-10"
              alt="user avatar"
            />
            <p className="nav-link m-auto display-none d-lg-initial">
              {currentEmail}
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default ThemeToggle;

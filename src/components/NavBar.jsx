import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { darkThemeContext, isAuthContext } from "../helpers/Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import addSvg from "../svg/folder-add-svgrepo-com.svg";
import warningSvg from "../svg/folder-warning-svgrepo-com.svg";
import userProfile from "../svg/user-svgrepo-com.svg";
import ThemeToggle from "./ThemeToggle";

function NavBar() {
  const { isAuth, setIsAuth } = useContext(isAuthContext);
  const { theme, setTheme } = useContext(darkThemeContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);
      alert("you have been signed out");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <nav
        class={`navbar navbar-expand-lg sticky-top align-center border-bottom ${
          theme
            ? "navbar-dark bg-dark  border-light"
            : "navbar-light bg-white  border-dark"
        }`}
      >
        <a class="navbar-brand ms-3 " href="#">
          Bug Tracker
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse m-3 m-md-lr-10"
          id="navbarNavDropdown"
        >
          {isAuth ? (
            <div className="list-group mt-3">
              <Link
                to="/profile"
                className={`list-group-item list-group-item-action d-flex justify-content-between ${
                  theme
                    ? "bg-dark text-white border border-white"
                    : "bg-white text-dark"
                }`}
              >
                Profile
                <img
                  src={userProfile}
                  className={`ms-3 ${theme ? "svgInvert" : null}`}
                  alt="user icon"
                />
              </Link>
              <Link
                to="/create"
                className={`list-group-item list-group-item-action d-flex justify-content-between ${
                  theme
                    ? "bg-dark text-white border border-white"
                    : "bg-white text-dark"
                }`}
                aria-current="true"
              >
                Create
                <img
                  src={addSvg}
                  className={`ms-3 ${theme ? "svgInvert" : null}`}
                  alt="folder add icon"
                />
              </Link>
              <Link
                to="/issues"
                className={`list-group-item list-group-item-action d-flex justify-content-between ${
                  theme
                    ? "bg-dark text-white border border-white"
                    : "bg-white text-dark"
                }`}
                aria-current="true"
              >
                Issues
                <img
                  src={warningSvg}
                  className={`ms-3 ${theme ? "svgInvert" : null}`}
                  alt="folder warning icon"
                />
              </Link>
            </div>
          ) : null}
          <div className="d-flex justify-content-center w-md-100">
            <button
              onClick={handleSignOut}
              className={`btn mt-3 ms-3 w-992px-80 ${
                theme ? "btn-light" : "btn-dark"
              }`}
            >
              Sign Out
            </button>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}

export default NavBar;

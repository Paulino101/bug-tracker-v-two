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
        class={`navbar fixed-top border-bottom ${
          theme
            ? "navbar-dark bg-dark  border-light"
            : "navbar-light bg-light  border-dark"
        } `}
      >
        <div class="container-fluid">
          <a class="navbar-brand">Bugtracker</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div
              class={`offcanvas-header ${
                theme ? "bg-dark text-white" : "bg-white text-dark"
              }`}
            >
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <ThemeToggle />
              <button
                type="button"
                class={`btn-close text-reset`}
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class={`offcanvas-body ${theme ? "bg-dark" : "bg-white"}`}>
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  {!isAuth ? (
                    <Link
                      to="/"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Log In
                    </Link>
                  ) : null}
                </li>
              </ul>
              {isAuth ? (
                <div className="list-group">
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
                    Create New Issue
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
                    See All Issues
                    <img
                      src={warningSvg}
                      className={`ms-3 ${theme ? "svgInvert" : null}`}
                      alt="folder warning icon"
                    />
                  </Link>
                </div>
              ) : null}
              <form class="d-flex">
                {isAuth ? (
                  <button
                    onClick={handleSignOut}
                    className={`btn d-flex justify-content-center w-100 mt-3 ${
                      theme ? "btn-light" : "btn-dark"
                    }`}
                  >
                    Sign Out
                  </button>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { darkThemeContext, isAuthContext } from "../helpers/Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import ThemeToggle from "./ThemeToggle";

function NavBar() {
  const { isAuth, setIsAuth } = useContext(isAuthContext);
  const { theme, setTheme } = useContext(darkThemeContext);
  let location = useLocation();
  let pathName = location.pathname;

  if (location.pathname !== "/") {
    console.log("youre not on the landing page");
  } else {
    console.log("youre on the landing page");
  }

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
      {pathName === "/" ? (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container px-5">
            <a className="navbar-brand" href="#page-top">
              Landing Page
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/register" className="nav-link" href="#!">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" href="#!">
                    Log In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : !isAuth ? null : (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
          <div className="container px-5">
            <a className="navbar-brand " href="#page-top">
              Buggy
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/profile" className="nav-link" href="#!">
                    Profile
                  </Link>
                </li>
                  <li className="nav-item">
                    <Link to="/issues" className="nav-link" href="#!">
                      See Bugs
                    </Link>
                  </li>
                <li className="nav-item">
                  <Link to="/create" className="nav-link" href="#!">
                    Create Bug
                  </Link>
                  </li>
                  <li className="nav-item">
                    <a onClick={handleSignOut} to="/issues" className="nav-link" href="#!">
                      Sign Out
                    </a>
                  </li>
                  
                  <li className="nav-item"> 
                  <ThemeToggle />
                  </li>
                
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;

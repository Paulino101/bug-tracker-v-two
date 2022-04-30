import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { isAuthContext } from "../helpers/Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import addSvg from "../svg/folder-add-svgrepo-com.svg";
import warningSvg from "../svg/folder-warning-svgrepo-com.svg";
import userProfile from "../svg/user-svgrepo-com.svg";

function NavBar() {
  const { isAuth, setIsAuth } = useContext(isAuthContext);

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
      <nav class="navbar navbar-light bg-light fixed-top ">
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
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
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
                    className="list-group-item list-group-item-action d-flex justify-content-between"
                  >
                    Profile
                    <img src={userProfile} className="ms-3" alt="user icon" />
                  </Link>
                  <Link
                    to="/create"
                    className="list-group-item list-group-item-action  d-flex justify-content-between"
                    aria-current="true"
                  >
                    Create New Issue
                    <img src={addSvg} className="ms-3" alt="folder add icon" />
                  </Link>
                  <Link
                    to="/issues"
                    className="list-group-item list-group-item-action  d-flex justify-content-between"
                    aria-current="true"
                  >
                    See All Issues
                    <img
                      src={warningSvg}
                      className="ms-3"
                      alt="folder warning icon"
                    />
                  </Link>
                </div>
              ) : null}
              <form class="d-flex">
                {isAuth ? (
                  <button
                    onClick={handleSignOut}
                    className="btn btn-primary d-flex justify-content-center w-100 mt-3"
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

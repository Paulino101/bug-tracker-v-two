import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { isAuthContext } from "../helpers/Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import addSvg from "../svg/folder-add-svgrepo-com.svg";
import deleteSvg from "../svg/folder-remove-svgrepo-com.svg";
import warningSvg from "../svg/folder-warning-svgrepo-com.svg";

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
      {/*  */}
      <nav class="navbar navbar-light bg-light fixed-top ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Offcanvas navbar
          </a>
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
                <li className="nav-item">
                  {isAuth ? (
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
                  ) : null}
                </li>
              </ul>
              {isAuth ? (
                <div className="list-group">
                  <Link
                    to="/create"
                    class="list-group-item list-group-item-action "
                    aria-current="true"
                  >
                    create an issue
                    <img src={addSvg} className="ms-3" />
                  </Link>
                  <Link
                    to="/issues"
                    class="list-group-item list-group-item-action "
                    aria-current="true"
                  >
                    see issues
                    <img src={warningSvg} className="ms-3" />
                  </Link>
                  <Link
                    to="/delete"
                    class="list-group-item list-group-item-action "
                    aria-current="true"
                  >
                    delete an issue
                    <img src={deleteSvg} className="ms-3" />
                  </Link>
                </div>
              ) : null}
              <form class="d-flex">
                {isAuth ? (
                  <button onClick={handleSignOut} className="btn btn-primary">
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

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { isAuthContext } from "../helpers/Context";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          BugTracker
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {!isAuth ? (
                <Link to="/" className="nav-link active" aria-current="page">
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
            <li className="nav-item">
              {isAuth ? (
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              ) : null}
            </li>
          </ul>
          {isAuth ? (
            <button onClick={handleSignOut} className="btn btn-primary">
              Sign Out
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

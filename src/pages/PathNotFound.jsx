import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/pathNotFoundStyles.css";
import { isAuthContext } from "./../helpers/Context";

function PathNotFound() {
  const { isAuth } = useContext(isAuthContext);
  return (
    <section className="error-area error-one">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-7 col-xl-8 col-lg-8">
            <div className="error-content text-center">
              <span className="error-404">404</span>
              <h5 className="sub-title">Page Not Found</h5>
              <p className="text">What are you looking for?</p>
              {isAuth ? (
                <Link className="text-decoration-none" to="/profile">
                  Head back to your profile
                </Link>
              ) : (
                <Link className="text-decoration-none" to="/">
                  How about you login first
                </Link>
              )}
              <div className="error-form"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PathNotFound;

import React from "react";
import "../startbootstrap-one-page-wonder-gh-pages/css/styles.css";
import { Link } from "react-router-dom";
import bugSvg from "../svg/landingPage/bug-svgrepo-com.svg";
import authSvg from "../svg/landingPage/authentication.svg";
import filterPng from "../photos/landingPage/filters.png";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <>
      <div id="page-top">
        {/* <!-- Header--> */}
        <header className="masthead text-center text-white">
          <div className="masthead-content">
            <div className="container px-5">
              <h1 className="masthead-heading mb-0">Bug Tracker</h1>
              <h2 className="masthead-subheading mb-0">
                The easiest way to keep track of bugs
              </h2>
            </div>
          </div>
          <div className="bg-circle-1 bg-circle"></div>
          <div className="bg-circle-2 bg-circle"></div>
          <div className="bg-circle-3 bg-circle"></div>
          <div className="bg-circle-4 bg-circle"></div>
        </header>
        {/* <!-- Content section 1--> */}
        <section id="scroll">
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                  <img className="img-fluid w-md-45" src={bugSvg} alt="..." />
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                  <h2 className="display-4">A way to keep track of bugs</h2>
                  <p>Keep track of your teams issues during development!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Content section 2--> */}
        <section>
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6">
                <div className="p-5">
                  <img className="img-fluid w-md-45" src={authSvg} alt="..." />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="p-5">
                  <h2 className="display-4">Authentication</h2>
                  <p>
                    An account is needed to do anything within the app , this is
                    for security. Additionally the app will keep track of issue
                    authors, giving them extra features over their posts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Content section 3--> */}
        <section>
          <div className="container px-5">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6 order-lg-2">
                <div className="p-5">
                  <img
                    className="img-fluid rounded-circle"
                    src={filterPng}
                    alt="..."
                  />
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="p-5">
                  <h2 className="display-4">Filters</h2>
                  <p>
                    There are multiple filters available to narrow down your
                    search. These filters work in tandem with the search box to
                    find exactly what youre looking for!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="d-flex justify-content-center">
          <Link
            to="/register"
            className="btn btn-primary btn-xl rounded-pill mt-5"
            href="#scroll"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

export default LandingPage;

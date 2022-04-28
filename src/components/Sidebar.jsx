import React from "react";
import addSvg from "../svg/folder-add-svgrepo-com.svg";
import deleteSvg from "../svg/folder-remove-svgrepo-com.svg";
import warningSvg from "../svg/folder-warning-svgrepo-com.svg";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <button
        className="btn btn-primary fs-6"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasStart"
        aria-controls="offcanvasStart"
      >
        toggle sidebar
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasStart"
        aria-labelledby="offcanvasStartLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasStartLabel">What do you want to do?</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
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
        </div>
      </div>
    </>
  );
}

export default Sidebar;

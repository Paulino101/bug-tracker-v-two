import React, { useState, useContext, useRef } from "react";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import refreshSvg from "../svg/refresh-reload-svgrepo-com.svg";
import editSvg from "../svg/edit-svgrepo-com.svg";
import "./styles.css";
import { darkThemeContext } from "../helpers/Context";
import Filters from "./Filters";
import Refresh from "./Refresh";

function Read({ dbData, getDbData }) {
  const admin = "paulinoiscoool@gmail.com";
  const currentUserEmail = auth.currentUser.email;

  const searchRef = useRef();

  const { theme, setTheme } = useContext(darkThemeContext);

  const [searchQuery, setSearchQuery] = useState("");

  const [mappableData, setMappableData] = useState(dbData);
  const [count, setCount] = useState(mappableData.length);
  const [loading, setLoading] = useState(null);
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState(false);

  const updateFixed = async (id, fixed) => {
    const boolDoc = doc(db, "bugs", id);
    const newBool = { fixed: true };
    await updateDoc(boolDoc, newBool);
    setCount(mappableData.length);
    getDbData();
  };

  const deleteIssue = async (id) => {
    const boolDoc = doc(db, "bugs", id);
    await deleteDoc(boolDoc);
    setCount(mappableData.length);
    getDbData();
  };

  const handleEdit = (id) => {
    setEditId(id);
    setEdit(!edit);
  };

  const handleFilterIssues = async () => {
    setMappableData(dbData);
    let issuesFiltered = mappableData.filter((d) => d.fixed === false);
    setMappableData(issuesFiltered);
  };

  const handleFilterSolved = () => {
    setMappableData(dbData);
    let solvedFiltered = mappableData.filter((d) => d.fixed === true);
    setMappableData(solvedFiltered);
  };

  const handleFilterAll = () => {
    {
      setMappableData(dbData);
    }
  };

  const handleSearch = () => {
    const noResults = [{ bugName: "No Results!" }];
    let filteredArray = [];
    setSearchQuery(searchRef.current.value.toLowerCase());
    dbData.map((d) => {
      let bugName = d.bugName.toLowerCase();

      if (bugName.includes(searchQuery)) {
        filteredArray.push(d);
      }
    });
    if (filteredArray.length !== 0) {
      setMappableData(filteredArray);
    } else {
      setMappableData(noResults);
    }
  };
  return (
    <section
      className={`pb-100vh ${
        theme ? "bg-dark text-white" : "bg-white text-dark"
      }`}
    >
      <h1 className="pt-5 text-center">Issues</h1>
      <div className="d-flex justify-content-end me-3">
        <Refresh theme={theme} refreshSvg={refreshSvg} getDbData={getDbData} />
      </div>
      <Filters
        handleFilterAll={handleFilterAll}
        handleFilterIssues={handleFilterIssues}
        handleFilterSolved={handleFilterSolved}
      />

      <div className="text-end m-3">
        <input
          type="text"
          onChange={handleSearch}
          ref={searchRef}
          placeholder="search"
          className="text-center text-capitalize from-control w-md-45"
        />
      </div>

      <div className="mt-5 d-md-flex flex-md-wrap justify-content-md-evenly d-xl-flex justify-content-xl-evenly flex-xl-row ">
        {mappableData.map((d) => (
          <div key={d.id} className="m-3 border rounded p-3 w-md-45 w-xl-30">
            <h5 className="text-capitalize fs-6 d-flex justify-content-between w-100">
              <p className="w-75">{d.bugName}</p>
              {d.fixed ? (
                <span
                  className={`badge ms-2 bg-success h-100 w-25 w-md-15 p-1`}
                >
                  Solved
                </span>
              ) : (
                <span className={`badge ms-2 bg-danger h-100 w-25 w-md-15 p-1`}>
                  Issue
                </span>
              )}
            </h5>

            <aside>{d.date}</aside>
            <p>{d.description}</p>
            {currentUserEmail === d.madeBy ? (
              <div className="d-flex justify-content-end">
                <button
                  onClick={() => {
                    handleEdit(d.id);
                  }}
                  className="btn"
                >
                  <img
                    src={editSvg}
                    alt=""
                    className={` ${theme ? "svgInvert" : null}`}
                  />
                </button>
              </div>
            ) : null}
            {edit && editId === d.id ? (
              <>
                {!d.fixed && currentUserEmail === d.madeBy ? (
                  <>
                    <div className="d-flex justify-content-end mb-1">
                      <button
                        onClick={() => {
                          updateFixed(d.id, d.fixed);
                        }}
                        className={`btn text-capitalize ${
                          theme ? "btn-success" : "btn-outline-success"
                        }`}
                      >
                        mark as fixed?
                      </button>
                    </div>
                    <div className="d-flex justify-content-end ">
                      <button
                        onClick={() => {
                          deleteIssue(d.id);
                        }}
                        className={`btn text-capitalize ${
                          theme ? "btn-danger" : "btn-outline-danger"
                        }`}
                      >
                        delete this issue?
                      </button>
                    </div>
                  </>
                ) : d.fixed && currentUserEmail === d.madeBy ? (
                  <div className="d-flex justify-content-end ">
                    <button
                      onClick={() => {
                        deleteIssue(d.id);
                      }}
                      className="btn btn-outline-danger text-capitalize"
                    >
                      delete this issue?
                    </button>
                  </div>
                ) : null}{" "}
              </>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Read;

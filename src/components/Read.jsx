import React, { useState, useContext } from "react";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import refreshSvg from "../svg/refresh-reload-svgrepo-com.svg";
import editSvg from "../svg/edit-svgrepo-com.svg";
import "./styles.css";

function Read({ data, getDbData }) {
  const admin = 'paulinoiscoool@gmail.com'
  const currentUserEmail = auth.currentUser.email

  const [count, setCount] = useState(data.length);
  const [loading, setLoading] = useState(null);
  const [editId, setEditId] = useState(null)
  const [edit, setEdit] = useState(false)

 
  const updateFixed = async (id, fixed) => {
    const boolDoc = doc(db, "bugs", id);
    const newBool = { fixed: true };
    await updateDoc(boolDoc, newBool);
    setCount(data.length);
    getDbData();
  };

  const deleteIssue = async (id) => {
    const boolDoc = doc(db, "bugs", id);
    await deleteDoc(boolDoc);
    setCount(data.length);
    getDbData();
    console.log(data);
  };

  const handleEdit = (id) => {
    setEditId(id)
    setEdit(!edit)
  }

  return (
    <>
      {data.length === 0 ? (
        <h1 className="text-center mt-7">No issues! yay :)</h1>
      ) : (
        <h1 className="text-center mt-7">Issues : {count}</h1>
      )}
      <div className="d-flex justify-content-end me-3">
        <button
          className="  w-15 w-md-7 w-xl-5 btn btn-outline-dark"
          onClick={() => {
            setLoading(true);
            getDbData();
            setCount(data.length);
            setLoading(false);
          }}
        >
          <img className="w-100" src={refreshSvg}></img>
        </button>
      </div>
      {/* refresh */}
      <div className="mt-5 d-md-flex flex-md-wrap justify-content-md-evenly d-xl-flex justify-content-xl-evenly flex-xl-row ">
        {data.map((d) => (
          <div key={d.id} className="m-3 border rounded p-3 w-md-45 w-xl-30">
            <h5 className="text-capitalize fs-6 d-flex justify-content-between w-100">
              <p className="w-75">{d.bugName}</p>
              {d.fixed ? (
                <span className={`badge ms-2 bg-success h-100 w-25 w-md-15 p-1`}>
                  Solved
                </span>
              ) : (
                <span className={`badge ms-2 bg-danger h-100 w-25 w-md-15 p-1`}>Issue</span>
              )}
            </h5>

            <aside>{d.date}</aside>
            <p>{d.description}</p>
            {currentUserEmail  === d.madeBy ? <div className="d-flex justify-content-end"><button onClick={() => {handleEdit(d.id)}} className="btn"><img src={editSvg} alt="" /></button></div> : null}
            {edit && editId === d.id ? (
              <> 
              {!d.fixed && currentUserEmail === d.madeBy  ? (
              <>
                <div className="d-flex justify-content-end mb-1">
                  <button
                    onClick={() => {
                      updateFixed(d.id, d.fixed);
                    }}
                    className="btn btn-outline-success text-capitalize"
                  >
                    mark as fixed?
                  </button>
                </div>
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
              </> ) :  d.fixed && currentUserEmail === d.madeBy ?
            (
              <div className="d-flex justify-content-end ">
                <button
                  onClick={() => {
                    deleteIssue(d.id);
                  }}
                  className="btn btn-outline-danger text-capitalize"
                >
                  delete this issue?
                </button>
              </div>)  : null } </> )  : null}
          </div>
        ))}
      </div>
    </>
  );
}

export default Read;

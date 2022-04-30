import React, { useState } from "react";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./styles.css";

function Read({ data }) {
  const [count, setCount] = useState(data.length);

  const updateFixed = async (id, fixed) => {
    const boolDoc = doc(db, "bugs", id);
    const newBool = { fixed: true };
    await updateDoc(boolDoc, newBool);
    setCount(count - 1);
    console.log("updated", id);
  };

  const deleteIssue = async (id) => {
    const boolDoc = doc(db, "bugs", id);
    await deleteDoc(boolDoc);
    setCount(count - 1);
    console.log("deleted");
  };
  return (
    <div className="mt-7">
      <h1 className="text-center">Issues : {count}</h1>

      {data.map((d) => (
        <div key={d.id} className="m-3 border rounded p-3">
          <h5 className="text-capitalize fs-6 d-flex justify-content-between w-100">
            <p className="w-75">{d.bugName}</p>
            {d.fixed ? (
              <span className={`badge ms-2 bg-success h-100 w-25`}>Solved</span>
            ) : (
              <span className={`badge ms-2 bg-danger h-100 w-25`}>Issue</span>
            )}
          </h5>

          <aside>{d.date}</aside>
          <p>{d.description}</p>
          {!d.fixed ? (
            <div className="d-flex justify-content-end"><button
              onClick={() => {
                updateFixed(d.id, d.fixed);
              }}
              className="btn btn-outline-success"
            >
              mark as fixed
            </button></div>
          ) : (
            <div className="d-flex justify-content-end">
              <button
                onClick={() => {
                  deleteIssue(d.id);
                }}
                className="btn btn-outline-danger"
              >
                delete this issue
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Read;

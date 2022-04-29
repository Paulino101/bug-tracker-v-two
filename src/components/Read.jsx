import React, { useState } from "react";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./styles.css";

function Read({ data }) {
  const [testr, setTestR] = useState(0);

  const refreshCreate = () => {
    setTestR(data.length);
  };
  const updateFixed = async (id, fixed) => {
    const boolDoc = doc(db, "bugs", id);
    const newBool = { fixed: true };
    await updateDoc(boolDoc, newBool);
  };

  const deleteIssue = async (id) => {
    const boolDoc = doc(db, "bugs", id);
    await deleteDoc(boolDoc);
  };
  return (
    <div className="mt-7">
      <h1 className="text-center">Issues</h1>
      <button onClick={refreshCreate} className="btn btn-outline-success">
        refresh
      </button>
      {data.map((d) => (
        <div key={d.id} className="m-3 border rounded p-3">
          <h5 className="text-capitalize fs-6">
            {d.bugName}
            {d.fixed ? (
              <span class="badge bg-success ms-2">Solved</span>
            ) : (
              <span class="badge bg-danger ms-2">Issue</span>
            )}
          </h5>

          <aside>{d.date}</aside>
          <p>{d.description}</p>
          {!d.fixed ? (
            <button
              onClick={updateFixed(d.id, d.fixed)}
              className="btn btn-outline-success"
            >
              mark as fixed
            </button>
          ) : (
            <button
              onClick={deleteIssue(d.id)}
              className="btn btn-outline-danger"
            >
              delete this issue
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Read;

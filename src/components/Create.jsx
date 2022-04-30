import React, { useRef, useState } from "react";
import { addDoc } from "firebase/firestore";

function Create({ collectionRef }) {
  const [submit, setSubmit] = useState(false);

  const titleRef = useRef("");
  const dateRef = useRef("");
  const descRef = useRef("");

  const handleCreateIssue = async (e) => {
    e.preventDefault();
    await addDoc(collectionRef, {
      bugName: titleRef.current.value,
      date: dateRef.current.value,
      description: descRef.current.value,
      fixed: false,
    });
    setSubmit(!submit);
    alert("Issue Created");
  };
  return (
    <>
      <h1 className="mt-7">Create New Issue</h1>
      <form className="m-2">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            ref={titleRef}
            type="text"
            className="form-control"
            placeholder="16 character limit"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            ref={dateRef}
            type="text"
            className="form-control"
            placeholder="XX/XX/XXXX"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input ref={descRef} type="text" className="form-control" />
        </div>
        <button className="btn btn-primary" onClick={handleCreateIssue}>
          create
        </button>
      </form>
    </>
  );
}

export default Create;

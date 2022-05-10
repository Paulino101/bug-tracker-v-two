import React, { useRef, useState, useContext } from "react";
import { addDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { darkThemeContext } from "../helpers/Context";

function Create({ collectionRef, getDbData }) {
  const [submit, setSubmit] = useState(false);
  const { theme, setTheme } = useContext(darkThemeContext);

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
      madeBy: auth.currentUser.email,
    });
    setSubmit(!submit);
    getDbData();
    alert("Issue Created");
  };
  return (
    <section
      className={`pb-100 ${
        theme ? "bg-dark text-white" : "bg-white text-dark"
      }`}
    >
      <h1 className="pt-7 text-center">Create New Issue</h1>
      <form className="m-2 m-md-5 m-xl-lr">
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
        <button
          className="btn btn-primary text-capitalize"
          onClick={handleCreateIssue}
        >
          create
        </button>
      </form>
    </section>
  );
}

export default Create;

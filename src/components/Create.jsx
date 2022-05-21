import React, { useRef, useState, useContext } from "react";
import { addDoc } from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { darkThemeContext } from "../helpers/Context";

import { motion } from "framer-motion";

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
      className={`pb-21  px-md-9 px-lg-10 ${
        theme ? "bg-dark text-white" : "bg-white text-dark"
      }`}
    >
      <h1 className="pt-7 text-center">Create New Issue</h1>
      <motion.form
        initial={{ x: -320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="m-2 m-md-5 m-xl-lr"
      >
        <div className="mb-3">
          <label className="form-label">Title</label>
          <motion.input
            whileHover={{ scale: 1.0125 }}
            ref={titleRef}
            type="text"
            className="form-control"
            placeholder="16 character limit"
          ></motion.input>
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <motion.input
            whileHover={{ scale: 1.0125 }}
            ref={dateRef}
            type="text"
            className="form-control"
            placeholder="XX/XX/XXXX"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <motion.input
            whileHover={{ scale: 1.0125 }}
            ref={descRef}
            type="text"
            className="form-control"
          />
        </div>
        <motion.button
          whileTap={{ scale: 1 }}
          whileHover={{ scale: 1.125 }}
          className="btn btn-primary text-capitalize"
          onClick={handleCreateIssue}
        >
          create
        </motion.button>
      </motion.form>
    </section>
  );
}

export default Create;

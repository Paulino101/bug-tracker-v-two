import React, { useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

import { Link } from "react-router-dom";

function RegisterForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const user = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(user);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <h1 className="mt-7 text-center">Register Form</h1>
      <form className="m-4 mt-2 m-md-5 mt-md-1">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button
          onClick={handleRegister}
          type="submit"
          className="w-100 btn btn-primary"
        >
          Submit
        </button>
        <aside>
          <Link to="/">Already Have an Account?</Link>
        </aside>
      </form>
    </>
  );
}

export default RegisterForm;

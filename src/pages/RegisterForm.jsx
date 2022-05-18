import React, { useRef, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { darkThemeContext } from "../helpers/Context";

function RegisterForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { theme, setTheme } = useContext(darkThemeContext);

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
    <div
      className={`p-xl-lr pb-22 ${
        theme ? "bg-dark text-white" : "bg-white text-dark"
      }`}
    >
      <h1 className="pt-7 text-center">Register Form</h1>
      <form className="m-4 mt-2 m-md-5 mt-md-1 px-sm-6 px-md-7 px-lg-15 px-xl-10">
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
          <Link to="/login">Already Have an Account?</Link>
        </aside>
      </form>
    </div>
  );
}

export default RegisterForm;

import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import React, { useRef, useState } from "react";
import googleLogo from "../../svg/googleLogo.svg";

import { Link } from "react-router-dom";

function LoginForm() {
  const provider = new GoogleAuthProvider();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const user = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoggedInUser(user);
      console.log(user);
    } catch (error) {
      setLoginError(error.message);
      console.log(error.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    try {
      e.preventDefault();
      const result = await signInWithPopup(auth, provider);
      setLoggedInUser(result);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignOut = async (e) => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center">Login</h1>
      <h5 className="text-center bg-info font-size-sm">
        Logged in as: {loggedInUser?.user.email}
      </h5>
      {loginError ? (
        <p className="bg-danger text-white w-100">{loginError}</p>
      ) : null}
      <form className="m-4 mt-2">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail2" className="form-label">
            Email address
          </label>
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="exampleInputPassword2"
          />
        </div>

        <button
          onClick={handleLogin}
          type="submit"
          className="w-100 mb-2 btn btn-primary"
        >
          Submit
        </button>
        <div className="text-center font-weight-bold mb-2">or</div>
        <button
          onClick={handleGoogleSignIn}
          className="w-100 mb-2 btn btn-outline-dark"
        >
          <img src={googleLogo} alt="google logo" className="me-2" />
          Sign In With Google
        </button>

        {loggedInUser ? (
          <button onClick={handleSignOut} className="w-100 btn btn-secondary">
            Sign Out
          </button>
        ) : null}

        <aside>
          <Link to="/register">Don't have an account?</Link>
        </aside>
      </form>
    </>
  );
}

export default LoginForm;

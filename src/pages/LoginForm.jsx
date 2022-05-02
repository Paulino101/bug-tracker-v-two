import React, { useRef, useState, useContext } from "react";
import { isAuthContext, loggedInUserDataContext } from "../helpers/Context";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../svg/googleLogo.svg";

function LoginForm() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const { isAuth, setIsAuth } = useContext(isAuthContext);
  const { loggedInUser, setLoggedInUser } = useContext(loggedInUserDataContext);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loginError, setLoginError] = useState(null);

  const handleRedirect = () => {
    navigate("/issues");
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const user = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoggedInUser(user);
      setIsAuth(true);
      handleRedirect();
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
      setIsAuth(true);
      handleRedirect();
      console.log(loggedInUser);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-7">Login</h1>

      {loginError ? (
        <p className="bg-danger text-white w-100">{loginError}</p>
      ) : null}
      <form className="m-4 mt-2 m-md-5 mt-md-1 m-xl-lr">
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

        <aside>
          <Link to="/register">Don't have an account?</Link>
        </aside>
      </form>
    </>
  );
}

export default LoginForm;

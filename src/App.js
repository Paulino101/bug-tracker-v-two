import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isAuthContext, loggedInUserDataContext } from "./helpers/Context";
import { useState } from "react";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import PathNotFound from "./pages/PathNotFound";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";

import ProtectedRoute from "./helpers/ProtectedRoute";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  return (
    <isAuthContext.Provider value={{ isAuth, setIsAuth }}>
      <loggedInUserDataContext.Provider
        value={{ loggedInUser, setLoggedInUser }}
      >
        <Router>
          <NavBar />
          <Routes>
            <Route path="/register" exact element={<RegisterForm />} />
            <Route path="/" exact element={<LoginForm />} />
            <Route path="*" element={<PathNotFound />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" exact element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </loggedInUserDataContext.Provider>
    </isAuthContext.Provider>
  );
}

export default App;

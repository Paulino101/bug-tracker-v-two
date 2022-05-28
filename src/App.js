import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  isAuthContext,
  loggedInUserDataContext,
  darkThemeContext,
  collectionContext,
} from "./helpers/Context";
import { auth, db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import PathNotFound from "./pages/PathNotFound";
import Profile from "./pages/Profile";
import Create from "./components/Create";
import Read from "./components/Read";
import NavBar from "./components/NavBar";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./helpers/ProtectedRoute";
import ThemeToggle from "./components/ThemeToggle";
import ThemeToggleLogic from "./helpers/ThemeToggleLogic";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";

function App() {
  const [admin, setAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [theme, setTheme] = useState(true);
  const [userSelectedCollection, setUserSelectedCollection] = useState("");

  const [dbData, setDbData] = useState([]);
  const bugColletionRef = collection(db, "bugs");

  const getDbData = async () => {
    const res = await getDocs(bugColletionRef);
    setDbData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    const getDbData = async () => {
      const res = await getDocs(bugColletionRef);
      setDbData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getDbData();
  }, []);

  return (
    <collectionContext.Provider
      value={{ userSelectedCollection, setUserSelectedCollection }}
    >
      <isAuthContext.Provider value={{ isAuth, setIsAuth }}>
        <loggedInUserDataContext.Provider
          value={{ loggedInUser, setLoggedInUser }}
        >
          <darkThemeContext.Provider value={{ theme, setTheme }}>
            <Router>
              <NavBar />
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" exact element={<LandingPage />} />
                <Route path="/register" exact element={<RegisterForm />} />
                <Route path="/login" exact element={<LoginForm />} />
                <Route path="*" element={<PathNotFound />} />
                {/* PROTECTED ROUTES */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" exact element={<Profile />} />
                  <Route
                    path="/create"
                    element={
                      <Create
                        getDbData={getDbData}
                        collectionRef={bugColletionRef}
                      />
                    }
                  />
                  <Route
                    path="/issues"
                    element={<Read getDbData={getDbData} dbData={dbData} />}
                  />
                </Route>
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Routes>
              <Footer />
            </Router>
          </darkThemeContext.Provider>
        </loggedInUserDataContext.Provider>
      </isAuthContext.Provider>
    </collectionContext.Provider>
  );
}

export default App;

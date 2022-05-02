import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isAuthContext, loggedInUserDataContext } from "./helpers/Context";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import PathNotFound from "./pages/PathNotFound";
import Profile from "./pages/Profile";
import Create from "./components/Create";
import Read from "./components/Read";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./helpers/ProtectedRoute";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const [dbData, setDbData] = useState([]);
  const bugColletionRef = collection(db, "bugs");

  const getDbData = async () => {
    const res = await getDocs(bugColletionRef);
    setDbData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(dbData);
  };

  useEffect(() => {
    getDbData();
  }, []);
  return (
    <isAuthContext.Provider value={{ isAuth, setIsAuth }}>
      <loggedInUserDataContext.Provider
        value={{ loggedInUser, setLoggedInUser }}
      >
        <Router>
          {isAuth ? <NavBar /> : null}
          <Routes>
            <Route path="/register" exact element={<RegisterForm />} />
            <Route path="/" exact element={<LoginForm />} />
            <Route path="*" element={<PathNotFound />} />
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
                element={
                  <Read
                    getDbData={getDbData}
                    data={dbData}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                }
              />
            </Route>
          </Routes>
        </Router>
      </loggedInUserDataContext.Provider>
    </isAuthContext.Provider>
  );
}

export default App;

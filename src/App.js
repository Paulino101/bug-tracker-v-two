import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isAuthContext } from "./components/helpers/Context";
import { useState } from "react";
import LoginForm from "./components/pages/LoginForm";
import RegisterForm from "./components/pages/RegisterForm";
import PathNotFound from "./components/pages/PathNotFound";
import NavBar from "./components/NavBar";
import Dashboard from "./components/pages/Dashboard";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <isAuthContext.Provider value={{ isAuth, setIsAuth }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/register" exact element={<RegisterForm />} />
          <Route path="/" exact element={<LoginForm />} />
          <Route path="*" element={<PathNotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </isAuthContext.Provider>
  );
}

export default App;

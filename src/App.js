import LoginForm from "./components/Authentication/LoginForm";
import RegisterForm from "./components/Authentication/RegisterForm";
import PathNotFound from "./components/PathNotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/register" exact element={<RegisterForm />} />
          <Route path="/" exact element={<LoginForm />} />
          <Route path="*" element={<PathNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

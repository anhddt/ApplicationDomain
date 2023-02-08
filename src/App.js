import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./components/loginPage/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import HomePage from "./components/homePage/Home";
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="home" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/customRoute/PrivateRoute";
import LoginPage from "./components/loginPage/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import HomePage from "./components/homePage/Home";
import UsersPage from "./components/usersPage/UsersPage";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
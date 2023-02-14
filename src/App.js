import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/customRoute/PrivateRoute";
import LoginPage from "./components/loginPage/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import HomePage from "./components/homePage/Home";
import AdminPage from "./components/adminPage/AdminPage";
import UsersPage from "./components/usersPage/UsersPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="admin" element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>}>
        </Route>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
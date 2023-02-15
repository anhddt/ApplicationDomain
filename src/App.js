import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/utils/AuthProvider";
import LoginPage from "./components/loginPage/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import HomePage from "./components/homePage/Home";
import AdminPage from "./components/adminPage/AdminPage";

const App = () => {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<HomePage />}/>
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../utils/AuthProvider";
import { PrivateRoute } from "../customRoute/PrivateRoute";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../register/RegisterPage";
import HomePage from "../homePage/Home";
import AdminPage from "../adminPage/AdminPage";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            exact
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

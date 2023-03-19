import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../utils/AuthProvider";
import { PrivateRoute } from "../customRoute/PrivateRoute";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../register/RegisterPage";
import HomePage from "../homePage/Home";
import AdminPage from "../adminPage/AdminPage";
import ProfilePage from "../profilePage/ProfilePage";
import CustomThemeProvider from "../utils/themeProvider/CustomThemeProvier";
import AccountsPage from "../accounts/AccountsPage";

const App = () => {
  return (
    <CustomThemeProvider>
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
            <Route
              exact
              path="/userProfile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/accounts"
              element={
                <PrivateRoute>
                  <AccountsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CustomThemeProvider>
  );
};

export default App;

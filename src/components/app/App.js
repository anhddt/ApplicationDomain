import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../utils/AuthProvider";
import { PrivateRoute } from "../customRoute/PrivateRoute";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../register/RegisterPage";
import HomePage from "../homePage/Home";
import AboutPage from "../about/AboutPage";
import ContactPage from "../contact/ContactPage";
import DashboardPage from "../dashboard/DashboardPage";
import AdminPage from "../adminPage/AdminPage";
import ProfilePage from "../profilePage/ProfilePage";
import CustomThemeProvider from "../utils/themeProvider/CustomThemeProvier";
import AccountsPage from "../accounts/AccountsPage";
import NotFoundPage from "../404/NotFoundPage";
import UploadDownload from "../accounts/uploadDownload/UploadDownload";

/**
 * The App components consists of the theme provider
 * and different routing components.
 * To navigate to a components, import useNavigate from react-router-dom
 * then see the path on each Route for the correct routing
 * To add a route, if the route is public, simply add to the publicPage
 * an object that has a path and a compnent
 * The same goes for privatePage.
 * The App function will stay as is.
 */

const publicPages = [
  { path: "/login", component: <LoginPage /> },
  { path: "/register", component: <RegisterPage /> },
  { path: "/about", component: <AboutPage /> },
  { path: "/contact", component: <ContactPage /> },
  //Testing
  { path: "/uploader", component: <UploadDownload /> },
];
const PublicRoutes = publicPages.map((page) => {
  return (
    <Route key={page.path} exact path={page.path} element={page.component} />
  );
});

const privatePages = [
  { path: "/admin", component: <AdminPage /> },
  { path: "/userProfile", component: <ProfilePage /> },
  { path: "/accounts", component: <AccountsPage /> },
  { path: "/dashboard", component: <DashboardPage /> },
];

const PrivateRoutes = privatePages.map((page) => {
  return (
    <Route
      key={page.path}
      exact
      path={page.path}
      element={<PrivateRoute>{page.component}</PrivateRoute>}
    />
  );
});
const App = () => {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            {PublicRoutes}
            {PrivateRoutes}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CustomThemeProvider>
  );
};

export default App;

import { Suspense, useState, useEffect, lazy } from "react";

import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "./Components/Layout";
import Loader from "./Components/loader/loader";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// auth routes
const Login = lazy(() => import("./Pages/auth/login"));
const Forgetpass = lazy(() => import("./Pages/auth/forgetpass"));
const Register = lazy(() => import("./Pages/auth/Register"));
// pages routes
const Home = lazy(() => import("./Pages/Home/Home"));
const Orders = lazy(() => import("./Pages/Orders/Orders"));
const ALLBooks = lazy(() => import("./Pages/Books/ALLBooks"));
const Users = lazy(() => import("./Pages/Users/Users"));
const Category = lazy(() => import("./Pages/Category/Category"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Subscription = lazy(() => import("./Pages/Subscription/Subscription"));
const Privacy = lazy(() => import("./Pages/Privacy/Privacy"));
const TermsAndConditions = lazy(() =>
  import("./Pages/TermsAndConditions/TermsAndConditions")
);
const BannerManagement = lazy(() =>
  import("./Pages/BannerManagement/BannerManagement")
);

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirect to login page if token is not found
      navigate("/Login", { replace: true });
    }
  }, [token, navigate]);

  // If the token exists, render the children components
  return token ? children : null;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="forgetpass"
            element={
              <Suspense fallback={<Loader />}>
                <Forgetpass />
              </Suspense>
            }
          />

          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Home />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="books"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <ALLBooks />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Orders />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Users />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="category"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Category />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="subscription"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Subscription />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="privacy"
              element={
                <Suspense fallback={<Loader />}>
                  <Privacy />
                </Suspense>
              }
            />
            <Route
              path="termsAndconditions"
              element={
                <Suspense fallback={<Loader />}>
                  <TermsAndConditions />
                </Suspense>
              }
            />
            <Route
              path="bannermanagement"
              element={
                <Suspense fallback={<Loader />}>
                  <BannerManagement />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

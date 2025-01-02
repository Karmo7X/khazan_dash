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
import AddAdmin from "./Pages/Users/AddAdmin";
import AddAuthor from "./Pages/Users/AddAuthor";
import UpdateAuthor from "./Pages/Users/UpdateAuthor";
import UpdateAdmin from "./Pages/Users/UpdateAdmin";
import Updatebook from "./Pages/Books/Updatebook";
import Addprivacy from "./Pages/Privacy/Addprivacy";
import AddTerms from "./Pages/TermsAndConditions/AddTerms";
import AddBanner from "./Pages/BannerManagement/AddBanner";
import AddFeature from "./Components/Addpages/AddFeature";
import UpdateFeature from "./Components/Addpages/UpdateFeature";
import AddCity from "./Components/Addpages/AddCity";
import AddAbout from "./Components/Addpages/AddAbout";

// auth routes
const Login = lazy(() => import("./Pages/auth/login"));
const Forgetpass = lazy(() => import("./Pages/auth/forgetpass"));
const Register = lazy(() => import("./Pages/auth/Register"));
// pages routes
const Home = lazy(() => import("./Pages/Home/Home"));
const Orders = lazy(() => import("./Pages/Orders/Orders"));
const ALLBooks = lazy(() => import("./Pages/Books/ALLBooks"));
const Addbook = lazy(() => import("./Pages/Books/Addbook"));
const Users = lazy(() => import("./Pages/Users/Users"));
const Admins = lazy(() => import("./Pages/Users/Admins"));
const Authors = lazy(() => import("./Pages/Users/Authors"));
const Category = lazy(() => import("./Pages/Category/Category"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Subscription = lazy(() => import("./Pages/Subscription/Subscription"));
const Privacy = lazy(() => import("./Pages/Privacy/Privacy"));
const Addcategory = lazy(() => import("./Pages/Category/Addcategory"));
const UpdateCategory = lazy(() => import("./Pages/Category/UpdateCategory"));
const Settings = lazy(() => import("./Pages/settings/settings"));
const AddSubscription = lazy(() =>
  import("./Pages/Subscription/AddSubscription")
);
const UpdateSubscription = lazy(() =>
  import("./Pages/Subscription/UpdateSubscription")
);
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
              path="books/all"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <ALLBooks />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="books/create"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Addbook />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="books/:id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Updatebook />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="orders/all"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Orders />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="users/all"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Users />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="users/admins"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Admins />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="admins/create"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <AddAdmin />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="admins/:id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <UpdateAdmin />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="users/authors"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Authors />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="authors/create"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <AddAuthor />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="authors/:id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <UpdateAuthor />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="category/all"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Category />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="category/create"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Addcategory />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="category/:id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <UpdateCategory />
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
              path="subscription/all"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Subscription />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="subscription/create"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <AddSubscription />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="subscription/:id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <UpdateSubscription />
                  </Suspense>
                </ProtectedRoute>
              }
            />
           
            <Route
              path="privacy/create"
              element={
                <Suspense fallback={<Loader />}>
                  <Addprivacy />
                </Suspense>
              }
            />
           <Route
              path="terms/create"
              element={
                <Suspense fallback={<Loader />}>
                  <AddTerms />
                </Suspense>
              }
            />
           <Route
              path="banner/create"
              element={
                <Suspense fallback={<Loader />}>
                  <AddBanner />
                </Suspense>
              }
            />
             
            <Route
              path="feature/create"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <AddFeature />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="feature/:id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <UpdateFeature />
                  </Suspense>
                </ProtectedRoute>
              }
            /> */}

             <Route
              path="city/create"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <AddCity />
                  </Suspense>
                </ProtectedRoute>
              }
            />
             <Route
              path="about/create"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <AddAbout />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="city/:id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <UpdateFeature />
                  </Suspense>
                </ProtectedRoute>
              }
            /> */}

            <Route
              path="settings/all"
              element={
                <Suspense fallback={<Loader />}>
                  <Settings />
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

import { Suspense, useState, lazy } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Loader from "./Components/loader/loader";

// auth routes
const Login = lazy(() => import ("./Pages/auth/login"));
const Forgetpass = lazy(() => import ("./Pages/auth/forgetpass"));
const Register = lazy(() => import ("./Pages/auth/Register"));
// pages routes
const Home = lazy(() => import ("./Pages/Home/Home"));
const Orders = lazy(() => import ("./Pages/Orders/Orders"));
const ALLBooks = lazy(() => import ("./Pages/Books/ALLBooks"));
const Users = lazy(() => import ("./Pages/Users/Users"));
const Category = lazy(() => import ("./Pages/Category/Category"));
const Profile = lazy(() => import ("./Pages/Profile/Profile"));
const Subscription = lazy(() => import ("./Pages/Subscription/Subscription"));
const Privacy = lazy(() => import ("./Pages/Privacy/Privacy"));
const TermsAndConditions = lazy(() => import ("./Pages/TermsAndConditions/TermsAndConditions"));
const BannerManagement = lazy(() => import ("./Pages/BannerManagement/BannerManagement"));
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route
              path="login"
              element={
                <Suspense fallback={<Loader/>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense fallback={<Loader/>}>
                  <Register />
                </Suspense>
              }
            />
             <Route
              path="forgetpass"
              element={
                <Suspense fallback={<Loader/>}>
                  <Forgetpass />
                </Suspense>
              }
            />
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loader/>}>
                  <Home />
                </Suspense>
              }
            />
            
            
             <Route
              path="books"
              element={
                <Suspense fallback={<Loader/>}>
                  <ALLBooks />
                </Suspense>
              }
            />
            <Route
              path="orders"
              element={
                <Suspense fallback={<Loader/>}>
                  <Orders />
                </Suspense>
              }
            />
            <Route
              path="users"
              element={
                <Suspense fallback={<Loader/>}>
                  <Users />
                </Suspense>
              }
            />
            <Route
              path="category"
              element={
                <Suspense fallback={<Loader/>}>
                  <Category />
                </Suspense>
              }
            />
             <Route
              path="profile"
              element={
                <Suspense fallback={<Loader/>}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="subscription"
              element={
                <Suspense fallback={<Loader/>}>
                  <Subscription />
                </Suspense>
              }
            />
            <Route
              path="privacy"
              element={
                <Suspense fallback={<Loader/>}>
                  <Privacy />
                </Suspense>
              }
            />
             <Route
              path="termsAndconditions"
              element={
                <Suspense fallback={<Loader/>}>
                  <TermsAndConditions />
                </Suspense>
              }
            />
             <Route
              path="bannermanagement"
              element={
                <Suspense fallback={<Loader/>}>
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

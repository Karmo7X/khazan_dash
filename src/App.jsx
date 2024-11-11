import { Suspense, useState, lazy } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Loader from "./Components/loader/loader";
import Orders from "./Pages/Orders/Orders";

const Home = lazy(() => import ("./Pages/Home/Home"));
const ALLBooks = lazy(() => import ("./Pages/Books/ALLBooks"));
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
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
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

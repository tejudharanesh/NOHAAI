import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/home/Dashboard.jsx";
import LoginPage from "./pages/auth/login/LoginPage.jsx";
import SignUpPage from "./pages/auth/signup/SignUp.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const [authUser, setAuthUser] = useState(null);

  return (
    <div className="flex">
      <Routes>
        <Route
          path="/"
          element={
            authUser ? <Dashboard user={authUser} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={<LoginPage setAuthUser={setAuthUser} />}
        />
        <Route
          path="/signup"
          element={
            !authUser ? (
              <SignUpPage setAuthUser={setAuthUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

function SignUp({ setAuthUser }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleGoogleLogin = async (response) => {
    try {
      console.log("Google Login Success:", response);
      const token = response.credential;
      const decodedToken = jwtDecode(token);

      const userData = {
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
      };
      console.log(userData);

      setAuthUser(userData);
      navigate("/");
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  };

  const handleFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        const data = response.data;
        console.log("Sign up successful:", data);

        const userData = {
          name: data.username,
          email: data.email,
        };

        setAuthUser(userData);
        navigate("/");
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } catch (err) {
      console.error("Sign up error:", err);

      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="flex w-[80%] lg:w-3/5 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 hidden lg:flex bg-gradient-to-r from-purple-700 to-pink-600 text-white flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to NOHAAI</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </p>
        </div>
        <div className="w-screen lg:w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold mb-6 text-purple-700">
            Create an Account
          </h2>
          <form className="w-full" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full p-3 rounded border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-3 rounded border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-3 rounded border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-3 rounded hover:bg-purple-700"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-1 w-full">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleFailure}
              text="signin_with"
              width="100%"
            />
          </div>
          <div className="w-full">
            <p
              className="text-sm text-gray-500 text-center mt-1 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login instead
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

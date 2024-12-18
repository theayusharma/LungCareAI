import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SignIn() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const lastPage = queryParams.get("last_page") || "/";

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailOrUsername,
        username: emailOrUsername,
        password,
      }),
    });

    setLoading(false);

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem("jwtToken", token); // Store the JWT token
      localStorage.setItem("userId", user.id);
      navigate(lastPage);
    } else {
      const { message } = await response.json();
      setError(message || "Login failed");
    }
  };

  return (
    <div>
      <div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign In
        </h2>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <div className="flex max-w-md mx-auto mt-6 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form className="space-y-6" onSubmit={handleSignIn}>
          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              type="text"
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-3xl text-sm/6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600
            p-2 transform hover:scale-103 transition-transform duration-300
          mr-4 py-2 px-4 border-0
      text-md font-semibold
      bg-blue-100 text-green-700
      hover:bg-green-100"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}{" "}
          </button>
        </form>
      </div>
      <p className="mt-10 text-center text-sm/6 text-gray-600">
        {" "}
        <Link to={`/signup?last_page=${encodeURIComponent(lastPage)}`}>
        Don't have an account? Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignIn;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const lastPage = queryParams.get("last_page") || "/";

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !username || !email || !password || !confirmPassword) {
      setLoading(false);
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password }),
    });

    setLoading(false);

    if (response.ok) {
      const { token, user } = await response.json();
      localStorage.setItem("jwtToken", token); // Store the JWT token
      navigate(`/signin?last_page=${encodeURIComponent(lastPage)}`);
    } else {
      const { message } = await response.json();
      setError(message || "Account creation failed");
    }
  };

  return (
    <div>
      <div>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign Up
        </h2>
        {error && <div className="text-red-500 mt-2 ">{error}</div>}
      </div>
      <div className="flex max-w-md mx-auto mt-6 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="mt-2">
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="mt-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-3xl text-sm/6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600
              p-2
            mr-4 py-2 px-4 border-0
        text-md font-semibold
        bg-blue-100 text-green-700
        hover:bg-green-100 hover:scale-103 transition-transform duration-300"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
      <p className="mt-10 text-center text-sm/6 text-gray-600">
        {" "}
        <Link to={`/signin?last_page=${encodeURIComponent(lastPage)}`}>
        Already have an account? Sign In
        </Link>
      </p>
    </div>
  );
}

export default SignUp;

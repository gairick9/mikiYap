import { useState } from "react";

const Welcome = () => {
  const [activeForm, setActiveForm] = useState("login");

  // Function to toggle between login and signup
  const handleToggle = (form) => {
    setActiveForm(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div
        className={`relative w-full max-w-md p-6 bg-white rounded-xl shadow-lg transition-all duration-500 ease-in-out transform ${
          activeForm === "signup" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sign Up Form */}
        {activeForm === "signup" && (
          <div className="form-container">
            <h1 className="text-center text-2xl font-bold mb-4">Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-md">Sign Up</button>
          </div>
        )}

        {/* Sign In Form */}
        {activeForm === "login" && (
          <div className="form-container">
            <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-md">Sign In</button>
          </div>
        )}

        {/* Toggle Buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 top-[calc(100%+20px)]">
          <button
            onClick={() => handleToggle("login")}
            className="px-4 py-10 text-white bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none"
          >
            Sign In
          </button>
          <button
            onClick={() => handleToggle("signup")}
            className="px-4 py-10 text-white bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none"
          >
            Sign Up
          </button>
        </div>

      </div>
    </div>
  );
};

export default Welcome;

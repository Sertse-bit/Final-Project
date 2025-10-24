import { useState } from "react";

export default function AuthModal({ isSignup, onClose, toggleMode }) {
  const [form, setForm] = useState({ email: "", password: "", username: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `${isSignup ? "Signing up" : "Signing in"} as ${
        form.username || form.email
      }`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="border rounded-md px-3 py-2 focus:outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border rounded-md px-3 py-2 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border rounded-md px-3 py-2 focus:outline-none"
          />

          <button
            type="submit"
            className="mt-2 bg-primary text-white rounded-md py-2 hover:bg-primary/90 transition"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-blue-600 hover:underline font-semibold"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


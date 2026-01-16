import { useState } from "react";
import CustomerInput from "../components/CustomerInput";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", form);
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <CustomerInput
              type="email"
              name="email"
              label="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              i_class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <CustomerInput
              type="password"
              name="password"
              label="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              i_class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-fdaa3d)] text-white py-2 rounded-lg hover:opacity-80 cursor-pointer transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

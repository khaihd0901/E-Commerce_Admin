import CustomerInput from "../components/CustomerInput";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authService/authSlice";
import * as Yup from "yup";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message]);
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {message.message == "Rejected" ? (
          <div className="text-sm text-redd-500">You are not admin</div>
        ) : null}
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <CustomerInput
              type="text"
              name="email"
              label="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
              placeholder="Enter your email"
              i_class="w-full px-4 py-2 border rounded-lg focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all "
              required
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
          {/* Password */}
          <div>
            <CustomerInput
              type="password"
              name="password"
              label="password"
              onChange={formik.handleChange("password")}
              value={formik.values.password}
              placeholder="Enter your password"
              i_class="w-full px-4 py-2 border rounded-lg focus:outline-none 
            focus:ring-2 focus:ring-[var(--color-fdaa3d)] focus:border-transparent transition-all"
              required
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
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

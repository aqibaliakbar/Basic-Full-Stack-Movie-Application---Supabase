import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp, clearError } from "../redux/features/userSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }

    try {
      await dispatch(
        signUp({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative" >
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-[64px] font-semibold text-white text-center mb-8">
          Sign up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-md p-3 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full p-3 rounded-md bg-input text-white placeholder-gray-400 border border-card"
              required
            />

            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              className="w-full p-3 rounded-md bg-input text-white placeholder-gray-400 border border-card"
              required
            />

            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              className="w-full p-3 rounded-md bg-input text-white placeholder-gray-400 border border-card"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-md bg-primary text-white font-medium hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
      <div className="absolute bottom-0 ">
        <img src="../bottom.png" className="w-screen" alt="" />
      </div>
    </div>
  );
}

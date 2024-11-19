import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../redux/features/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        signIn({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-[64px] font-semibold text-white text-center mb-8">
          Sign in
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
          </div>

          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="remember"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-emerald-400 focus:ring-emerald-400 "
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-md bg-primary text-white font-medium hover:bg-primary/80 cursor-pointer "
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/80">
              Sign up
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

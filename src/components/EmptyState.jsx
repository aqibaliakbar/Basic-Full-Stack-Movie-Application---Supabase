import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../redux/features/userSlice";

export default function EmptyState() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#093545] relative">
  
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
        >
          <p>Logout</p>
          <LogOut className="w-6 h-6" />
        </button>
      </div>

      {/* Main content centered */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">
            Your movie list is empty
          </h1>
          <Link
            to="/create"
            className="inline-block bg-[#2BD17E] text-white px-6 py-3 rounded-md hover:bg-[#2BD17E]/80 transition-colors"
          >
            Add a new movie
          </Link>
        </div>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import SessionLoading from "../components/SessionLoading";

export default function Layout() {
  const { session, isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <SessionLoading />;
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-background relative z-50 ">
      <Outlet />
      <div className="absolute bottom-0 ">
        <img src="../bottom.png" className="w-screen" alt="" />
      </div>
    </div>
  );
}

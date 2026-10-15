import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function AuthLayout() {
  const { isLoading } = useContext(authContext);

  return isLoading ? (
    <h1>loading.....</h1>
  ) : (
    <div className="flex justify-center items-center min-h-screen text-center   bg-gradient-to-br from-indigo-400 to-purple-700 ">
      <div className="border rounded-2xl p-6 min-w-xl bg-white/40">
        <Outlet />
      </div>
    </div>
  );
}

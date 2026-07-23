import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  ClipboardList,
  Users,
  PlusCircle,
  Wrench,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const dashboardRoute =
    user?.role === "ADMIN"
      ? "/admin"
      : user?.role === "MAINTENANCE_OFFICER"
        ? "/officer"
        : "/student";
  console.log("Sidebar user:", user);
  console.log("Sidebar role:", user?.role);
  console.log("Dashboard route:", dashboardRoute);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        CampusFix
      </h1>

      <nav className="space-y-4">

        <NavLink
          to={dashboardRoute}
          className="flex items-center gap-3 hover:text-green-400"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to={
            user?.role === "ADMIN"
              ? "/admin/requests"
              : user?.role === "MAINTENANCE_OFFICER"
                ? "/officer/requests"
                : "/student/requests"
          }
          className="flex items-center gap-3 hover:text-green-400"
        >
          <ClipboardList size={20} />
          Requests
        </NavLink>

        <NavLink
          to="/student/report"
          className="flex items-center gap-3 hover:text-green-400">

          <ClipboardList size={20} />

          Report Issue

        </NavLink>

        <NavLink
          to="/student"
          className="flex items-center gap-3 hover:text-green-400">

          <Users size={20} />

          Users

        </NavLink>

        <NavLink
          to="/student"
          className="flex items-center gap-3 hover:text-green-400">

          <Wrench size={20} />

          Officers

        </NavLink>

        <NavLink
          to="/student"
          className="flex items-center gap-3 hover:text-green-400">

          <Settings size={20} />

          Settings

        </NavLink>

      </nav>

      <button
        variant="destructive"
        onClick={handleLogout}
        className="mt-20 flex items-center gap-3 text-red-400 hover:text-red-300 cursor-pointer"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}
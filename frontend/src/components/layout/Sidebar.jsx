import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Wrench,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        CampusFix
      </h1>

      <nav className="space-y-4">

        <button className="flex items-center gap-3 hover:text-green-400">

          <LayoutDashboard size={20} />

          Dashboard

        </button>

        <button className="flex items-center gap-3 hover:text-green-400">

          <ClipboardList size={20} />

          Requests

        </button>

        <button className="flex items-center gap-3 hover:text-green-400">

          <Users size={20} />

          Users

        </button>

        <button className="flex items-center gap-3 hover:text-green-400">

          <Wrench size={20} />

          Officers

        </button>

        <button className="flex items-center gap-3 hover:text-green-400">

          <Settings size={20} />

          Settings

        </button>

      </nav>

      <button className="mt-20 flex items-center gap-3 text-red-400">

        <LogOut size={20} />

        Logout

      </button>

    </aside>
  );
}
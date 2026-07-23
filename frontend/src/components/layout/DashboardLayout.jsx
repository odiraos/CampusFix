import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  title,
  children,
}) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header title={title} />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSidebar } from "../../hooks/useSidebar";

export default function Layout({ children }) {
  const { open, toggle } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={open} />
      <div className="flex flex-1 flex-col">
        <Navbar toggle={toggle} sidebarOpen={open} />
        <main className="flex-1 p-4 overflow-auto">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}

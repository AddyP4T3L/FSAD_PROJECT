import { useNavigate } from "react-router-dom";

export default function Navbar({ toggle, sidebarOpen }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem("cc_user") || "Student";

  const handleLogout = () => {
    localStorage.removeItem("cc_auth");
    localStorage.removeItem("cc_user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center gap-4 h-16 px-4 bg-blue-600 text-white border-b border-gray-400 shrink-0">
      <button
        type="button"
        onClick={toggle}
        className="bg-blue-700 px-3 py-1 text-white font-semibold hover:bg-blue-800"
      >
        ☰
      </button>

      <div className="flex-1">
        <h1 className="text-lg font-bold">Campus ERP</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, {userName}</span>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 text-sm text-white font-semibold hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

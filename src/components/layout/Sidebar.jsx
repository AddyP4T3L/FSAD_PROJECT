import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/academic-registration", label: "Academic Registration" },
  { to: "/attendance", label: "Attendance" },
  { to: "/courses", label: "Courses" },
  { to: "/exam", label: "Exam Section" },
  { to: "/fee-payments", label: "Fee Payments" },
  { to: "/library", label: "Library" },
  { to: "/cgpa", label: "CGPA" },
  { to: "/timetable", label: "Timetable" },
  { to: "/users", label: "Users" },
  { to: "/reports", label: "Reports" },
  { to: "/profile", label: "Profile" },
  { to: "/settings", label: "Settings" },
];

export default function Sidebar({ open }) {
  return (
    <aside
      className={`flex flex-col h-full bg-gray-100 border-r border-gray-300 transition-all ${open ? "w-56" : "w-16"}`}
    >
      <div className="p-4 bg-blue-600 text-white font-bold text-center">
        {open ? "Campus ERP" : "ERP"}
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded text-sm ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-gray-200"
                  }`
                }
              >
                {open ? label : label.charAt(0)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

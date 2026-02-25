import { useState, useEffect } from "react";
import Table from "../components/ui/Table";
import { fetchUsers } from "../api/mockApi";

function StatusBadge({ value }) {
  const isActive = value === "active";
  return (
    <span
      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
        isActive ? "bg-emerald-100 text-emerald-700" : "bg-neutral-200 text-neutral-600"
      }`}
    >
      {value}
    </span>
  );
}

export default function Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchUsers()
      .then((res) => {
        if (!cancelled) setData(res || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Failed to load users");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const columns = ["name", "email", "role", "department", "status", "joinedAt"];
  const tableData = data.map((row) => ({
    ...row,
    status: <StatusBadge value={row.status} />,
  }));

  return (
    <section aria-label="Users" className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-neutral-900">Users</h1>
        <p className="text-neutral-500 mt-1">Manage students, teachers, and staff</p>
      </header>

      {error && (
        <div
          className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700"
          role="alert"
        >
          {error}
        </div>
      )}

      <Table
        columns={columns}
        data={tableData}
        isLoading={loading}
        emptyMessage="No users found"
      />
    </section>
  );
}

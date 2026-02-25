import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import { fetchDashboard } from "../api/mockApi";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchDashboard()
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Failed to load dashboard");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4\">Dashboard</h1>
        <p className="text-gray-500\">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4\">Dashboard</h1>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700\">
          {error}
        </div>
      </section>
    );
  }

  const { stats = {}, recentActivity = [] } = data || {};

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div>
            <p className="text-xs text-gray-500">Students</p>
            <p className="text-2xl font-bold text-gray-900">{stats.students ?? 0}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-xs text-gray-500">Teachers</p>
            <p className="text-2xl font-bold text-gray-900">{stats.teachers ?? 0}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-xs text-gray-500">Departments</p>
            <p className="text-2xl font-bold text-gray-900">{stats.departments ?? 0}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-xs text-gray-500">Courses</p>
            <p className="text-2xl font-bold text-gray-900">{stats.courses ?? 0}</p>
          </div>
        </Card>
      </div>

      <Card title="Recent Activity">
        <div className="space-y-3">
          {recentActivity.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent updates.</p>
          ) : (
            recentActivity.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-2 last:border-0">
                <p className="font-semibold text-sm text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-600">{item.detail}</p>
                <p className="text-xs text-gray-400 mt-1">{item.time}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </section>
  );
}

import { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Button from "../components/ui/Button";
import { fetchCourses } from "../api/mockApi";

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-100 text-emerald-700",
    Completed: "bg-neutral-200 text-neutral-600",
  };
  return (
    <span
      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
        styles[status] ?? "bg-neutral-200 text-neutral-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function Courses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchCourses()
      .then((res) => {
        if (!cancelled) setData(res || []);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Failed to load courses");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <section aria-label="Courses" className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-neutral-900">Courses</h1>
          <p className="text-neutral-500 mt-1">View all available courses</p>
        </header>
        <div className="grid gap-4" role="status" aria-live="polite">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} title="">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-lg bg-neutral-200 animate-pulse" aria-hidden />
                <div className="flex-1">
                  <div className="h-5 w-48 bg-neutral-200 rounded animate-pulse" aria-hidden />
                  <div className="h-4 w-32 mt-2 bg-neutral-100 rounded animate-pulse" aria-hidden />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section aria-label="Courses">
        <header>
          <h1 className="text-2xl font-bold text-neutral-900">Courses</h1>
        </header>
        <div
          className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700"
          role="alert"
        >
          {error}
        </div>
      </section>
    );
  }

  const totalCourses = data.length;
  const totalCredits = data.reduce((sum, course) => sum + (course.credits || 0), 0);
  const fullSeats = data.filter((course) => {
    if (!course.seats) return false;
    const [taken, capacity] = course.seats.split("/").map((value) => Number(value));
    return Number.isFinite(taken) && Number.isFinite(capacity) && taken >= capacity;
  }).length;

  const columns = [
    { key: "code", label: "Course" },
    { key: "title", label: "Title" },
    { key: "credits", label: "Credits" },
    { key: "instructor", label: "Instructor" },
    { key: "schedule", label: "Schedule" },
    { key: "room", label: "Room" },
    { key: "seats", label: "Seats" },
    { key: "status", label: "Status" },
  ];

  const tableData = data.map((course) => ({
    ...course,
    status: <StatusBadge status={course.status} />,
  }));

  return (
    <section aria-label="Courses" className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Courses</h1>
          <p className="text-neutral-500 mt-1">Current semester course catalog</p>
        </div>
        <Button variant="primary">Download Catalog</Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-neutral-500">Total Courses</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">{totalCourses}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500">Total Credits</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">{totalCredits}</p>
        </Card>
        <Card>
          <p className="text-sm text-neutral-500">Full Sections</p>
          <p className="text-2xl font-bold text-neutral-900 mt-2">{fullSeats}</p>
        </Card>
      </div>

      <Table
        columns={columns}
        data={tableData}
        isLoading={loading}
        emptyMessage="No courses available"
      />
    </section>
  );
}
